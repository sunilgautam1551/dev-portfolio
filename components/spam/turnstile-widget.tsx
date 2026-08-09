"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

/**
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, so the rest
 * of a form still works locally before Cloudflare credentials are added.
 */
export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const { resolvedTheme } = useTheme();

  if (!siteKey) return null;

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onExpire={onExpire}
      options={{ theme: resolvedTheme === "dark" ? "dark" : "light" }}
    />
  );
}
