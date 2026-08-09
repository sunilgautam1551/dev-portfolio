import { Ratelimit } from "@upstash/ratelimit";

import { getRedis } from "@/lib/redis";

/**
 * 5 requests/hour/IP, matching the PRD's contact form spam-protection spec.
 * Reused for the guestbook so both surfaces share one rate-limiting policy.
 */
export function createRateLimiter(prefix: string, limit = 5, window: `${number} h` = "1 h") {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: `ratelimit:${prefix}`,
  });
}

export { getClientIp } from "@/lib/ip";
