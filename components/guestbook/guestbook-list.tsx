import { formatDate } from "@/lib/date";
import type { GuestbookEntry } from "@/types/guestbook";

export function GuestbookList({ entries }: { entries: GuestbookEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No notes yet — be the first to sign the guestbook.
      </p>
    );
  }

  return (
    <ul className="max-h-96 space-y-4 overflow-y-auto pr-2">
      {entries.map((entry) => (
        <li key={entry.id} className="border-border bg-card rounded-lg border p-4">
          <p className="text-sm leading-relaxed">{entry.message}</p>
          <p className="text-muted-foreground mt-2 text-xs font-medium">
            {entry.name} · {formatDate(entry.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  );
}
