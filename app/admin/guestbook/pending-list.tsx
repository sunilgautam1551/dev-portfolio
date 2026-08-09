"use client";

import { Check, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/date";
import type { GuestbookEntry } from "@/types/guestbook";

import { approveGuestbookEntry, rejectGuestbookEntry } from "./actions";

export function PendingList({ entries }: { entries: GuestbookEntry[] }) {
  const [items, setItems] = useState(entries);
  const [isPending, startTransition] = useTransition();
  const [activeId, setActiveId] = useState<string | null>(null);

  function handle(id: string, action: (id: string) => Promise<void>, label: string) {
    setActiveId(id);
    startTransition(async () => {
      await action(id);
      setItems((prev) => prev.filter((entry) => entry.id !== id));
      toast.success(label);
      setActiveId(null);
    });
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground text-sm">No pending entries. All caught up.</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((entry) => (
        <li key={entry.id} className="border-border bg-card rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{entry.name}</p>
              <p className="text-muted-foreground mt-1 text-sm">{entry.message}</p>
              <p className="text-muted-foreground mt-2 text-xs">
                {formatDateTime(entry.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                size="icon-sm"
                variant="outline"
                aria-label="Approve"
                disabled={isPending && activeId === entry.id}
                onClick={() => handle(entry.id, approveGuestbookEntry, "Entry approved")}
              >
                <Check className="size-4" />
              </Button>
              <Button
                size="icon-sm"
                variant="destructive"
                aria-label="Reject"
                disabled={isPending && activeId === entry.id}
                onClick={() => handle(entry.id, rejectGuestbookEntry, "Entry rejected")}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
