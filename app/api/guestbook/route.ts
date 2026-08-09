import { NextResponse } from "next/server";

import { createPendingEntry, listApprovedEntries } from "@/lib/guestbook";
import { getClientIp, createRateLimiter } from "@/lib/ratelimit";
import { isRedisConfigured } from "@/lib/redis";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { guestbookFormSchema } from "@/lib/validations/guestbook";

export const runtime = "nodejs";

export async function GET() {
  if (!isRedisConfigured()) {
    return NextResponse.json({ entries: [] });
  }
  const entries = await listApprovedEntries();
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  if (!isRedisConfigured()) {
    return NextResponse.json(
      { error: "The guestbook isn't configured on this deployment yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = guestbookFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, message, company, turnstileToken } = parsed.data;

  // Honeypot: a filled-in "company" field means a bot filled every input.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request.headers);

  const ratelimit = createRateLimiter("guestbook", 5, "1 h");
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  if (isTurnstileConfigured()) {
    const verified = await verifyTurnstileToken(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json({ error: "Verification failed. Please retry." }, { status: 400 });
    }
  }

  await createPendingEntry({ name, message });

  return NextResponse.json({ ok: true });
}
