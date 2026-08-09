import type { Metadata } from "next";

import { listPendingEntries } from "@/lib/guestbook";
import { isRedisConfigured } from "@/lib/redis";

import { PendingList } from "./pending-list";

export const metadata: Metadata = {
  title: "Guestbook moderation",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminGuestbookPage() {
  if (!isRedisConfigured()) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-heading text-2xl font-semibold">Guestbook moderation</h1>
        <p className="text-muted-foreground mt-4 text-sm">
          Upstash Redis isn&apos;t configured on this deployment yet. Add UPSTASH_REDIS_REST_URL and
          UPSTASH_REDIS_REST_TOKEN to enable the guestbook.
        </p>
      </div>
    );
  }

  const pending = await listPendingEntries();

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-heading text-2xl font-semibold">Guestbook moderation</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        {pending.length} {pending.length === 1 ? "entry" : "entries"} awaiting approval.
      </p>
      <div className="mt-8">
        <PendingList entries={pending} />
      </div>
    </div>
  );
}
