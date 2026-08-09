import { formatDate } from "@/lib/date";
import type { GuestbookEntry } from "@/types/guestbook";

export function GuestbookList({ entries }: { entries: GuestbookEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="border-border bg-card flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          No notes yet — be the first to sign the guestbook.
        </p>
      </div>
    );
  }

  return (
    <ul className="max-h-104 space-y-3 overflow-y-auto pr-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="border-border bg-card hover:border-primary/30 flex gap-3 rounded-xl border p-4 transition-colors"
        >
          <span className="bg-accent text-accent-foreground font-heading flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {entry.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm leading-relaxed wrap-break-word">{entry.message}</p>
            <p className="text-muted-foreground mt-2 text-xs font-medium">
              {entry.name} · {formatDate(entry.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
