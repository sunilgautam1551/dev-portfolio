import { unstable_cache } from "next/cache";

import { getRedis } from "@/lib/redis";
import type { GuestbookEntry } from "@/types/guestbook";

const PENDING_KEY = "guestbook:pending";
const APPROVED_KEY = "guestbook:approved";
export const GUESTBOOK_CACHE_TAG = "guestbook";

function sortByNewest(entries: GuestbookEntry[]): GuestbookEntry[] {
  return [...entries].sort((a, b) => b.createdAt - a.createdAt);
}

export async function createPendingEntry(input: {
  name: string;
  message: string;
}): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: input.name,
    message: input.message,
    createdAt: Date.now(),
  };
  await getRedis().hset(PENDING_KEY, { [entry.id]: entry });
  return entry;
}

export async function listPendingEntries(): Promise<GuestbookEntry[]> {
  const all = await getRedis().hgetall<Record<string, GuestbookEntry>>(PENDING_KEY);
  return all ? sortByNewest(Object.values(all)) : [];
}

export async function listApprovedEntries(limit = 50): Promise<GuestbookEntry[]> {
  const all = await getRedis().hgetall<Record<string, GuestbookEntry>>(APPROVED_KEY);
  return all ? sortByNewest(Object.values(all)).slice(0, limit) : [];
}

/**
 * Cached wrapper for the homepage's guestbook list, so "/" stays statically
 * generated instead of opting into full dynamic rendering just because one
 * section reads from Redis. Busted instantly via GUESTBOOK_CACHE_TAG whenever
 * an entry is approved (see app/admin/guestbook/actions.ts), and otherwise
 * revalidates hourly as a safety net.
 */
export const getApprovedEntriesCached = unstable_cache(
  () => listApprovedEntries(),
  ["guestbook-approved-entries"],
  { tags: [GUESTBOOK_CACHE_TAG], revalidate: 3600 },
);

export async function approveEntry(id: string): Promise<void> {
  const redis = getRedis();
  const entry = await redis.hget<GuestbookEntry>(PENDING_KEY, id);
  if (!entry) return;
  await redis.hset(APPROVED_KEY, { [id]: entry });
  await redis.hdel(PENDING_KEY, id);
}

export async function rejectEntry(id: string): Promise<void> {
  await getRedis().hdel(PENDING_KEY, id);
}
