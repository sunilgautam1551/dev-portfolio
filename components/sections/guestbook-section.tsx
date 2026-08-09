import dynamic from "next/dynamic";

import { Reveal } from "@/components/motion/reveal";
import { GuestbookList } from "@/components/guestbook/guestbook-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getApprovedEntriesCached } from "@/lib/guestbook";
import { isRedisConfigured } from "@/lib/redis";

const GuestbookForm = dynamic(
  () => import("@/components/guestbook/guestbook-form").then((m) => m.GuestbookForm),
  { loading: () => <Skeleton className="h-80 w-full rounded-2xl" /> },
);

export async function GuestbookSection() {
  const entries = isRedisConfigured() ? await getApprovedEntriesCached() : [];

  return (
    <section id="guestbook" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Guestbook
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            Leave a public note. Entries are reviewed before they appear here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <GuestbookForm />
          </Reveal>
          <Reveal delay={0.1}>
            <GuestbookList entries={entries} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
