import { NextResponse } from "next/server";

import { identity } from "@/lib/content";
import { getClientIp, createRateLimiter } from "@/lib/ratelimit";
import { isRedisConfigured } from "@/lib/redis";
import { getResend, isResendConfigured } from "@/lib/resend";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { contactFormSchema, contactReasonLabels } from "@/lib/validations/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, reason, message, company, turnstileToken } = parsed.data;

  // Honeypot: a filled-in "company" field means a bot filled every input.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request.headers);

  if (isRedisConfigured()) {
    const ratelimit = createRateLimiter("contact", 5, "1 h");
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }
  }

  if (isTurnstileConfigured()) {
    const verified = await verifyTurnstileToken(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json({ error: "Verification failed. Please retry." }, { status: 400 });
    }
  }

  if (!isResendConfigured()) {
    return NextResponse.json(
      { error: "Email delivery isn't configured on this deployment yet." },
      { status: 503 },
    );
  }

  try {
    const resend = getResend();

    // The publicly displayed contact address (identity.email) may differ from
    // where notifications actually land, since Resend's sandbox mode (no
    // verified domain) only allows sending to the account's own email.
    const notificationRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || identity.email;

    const { error: notifyError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: notificationRecipient,
      replyTo: email,
      subject: `[Portfolio] ${contactReasonLabels[reason]} — ${name}`,
      text: `From: ${name} <${email}>\nReason: ${contactReasonLabels[reason]}\n\n${message}`,
    });

    if (notifyError) {
      console.error("[contact] Failed to send owner notification:", notifyError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }

    // Best-effort: the sender's auto-reply is a nice-to-have, not the core
    // feature — a failure here (e.g. Resend sandbox restrictions before a
    // domain is verified) shouldn't fail the whole submission.
    const { error: replyError } = await resend.emails.send({
      from: "Sunil Gautam <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out",
      text: `Hi ${name},\n\nThanks for your message — I'll get back to you soon.\n\n— ${identity.name}`,
    });

    if (replyError) {
      console.error("[contact] Failed to send sender auto-reply:", replyError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
