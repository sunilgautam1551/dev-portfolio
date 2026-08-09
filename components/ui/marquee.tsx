import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal scroll of pills. Renders the list twice back-to-back
 * and animates a translateX(-50%) loop, so the seam is invisible. Plain CSS
 * `animation`, which the global prefers-reduced-motion override already
 * freezes — no extra handling needed here.
 */
export function Marquee({ items, reverse = false, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="border-border bg-card text-muted-foreground shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
