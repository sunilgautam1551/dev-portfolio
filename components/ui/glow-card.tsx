import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared hover treatment for content cards site-wide: a lift + soft
 * single-hue glow that follows the cursor (`.spotlight`, driven by
 * PointerSpotlight), with `group` wired up so children can react (e.g. an
 * icon scaling on `group-hover:scale-110`).
 */
export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "spotlight border-border bg-card group relative h-full rounded-xl border p-6 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-glow hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
