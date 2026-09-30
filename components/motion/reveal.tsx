import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

/**
 * Fades content up as it scrolls into view. Driven purely by the CSS
 * `.reveal` scroll timeline in globals.css — no JS, so it works before
 * hydration and content is never server-rendered hidden. `delay` (seconds,
 * kept for call-site compatibility) staggers siblings by shifting where in
 * the scroll range each one starts.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay * 100}%` } as CSSProperties) : undefined;

  return (
    <Tag className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
