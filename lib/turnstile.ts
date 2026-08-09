const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * Verifies a Turnstile token server-side. Returns true if Turnstile isn't
 * configured yet (local dev without a Cloudflare account) so the rest of the
 * form flow can still be exercised — remove that fallback once real keys are set.
 */
export async function verifyTurnstileToken(token: string | undefined, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (!token) return false;

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: secretKey, response: token, remoteip: ip }),
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success: boolean };
  return data.success;
}
