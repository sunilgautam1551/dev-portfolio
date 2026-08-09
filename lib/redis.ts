import { Redis } from "@upstash/redis";

let client: Redis | null = null;

/**
 * Lazily constructed so the app can still build/run locally without
 * Upstash credentials configured — routes that need it check `isRedisConfigured()`
 * first and return a clear error instead of throwing at import time.
 */
export function getRedis(): Redis {
  if (!client) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error("Upstash Redis is not configured (UPSTASH_REDIS_REST_URL/TOKEN missing).");
    }
    client = new Redis({ url, token });
  }
  return client;
}

export function isRedisConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
