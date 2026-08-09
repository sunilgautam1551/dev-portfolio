/**
 * Illustrative, generic UI — not a screenshot of the real product (which is
 * confidential). Stands in for "real-time asset tracking dashboard" with
 * placeholder numbers and an abstract map of marker dots.
 */
const markers = [
  { x: 18, y: 30 },
  { x: 32, y: 55 },
  { x: 45, y: 22 },
  { x: 58, y: 48 },
  { x: 70, y: 28 },
  { x: 25, y: 70 },
  { x: 52, y: 68 },
  { x: 78, y: 60 },
  { x: 40, y: 40 },
  { x: 85, y: 38 },
];

export function DashboardMockup() {
  return (
    <div
      role="img"
      aria-label="Illustrative mockup of a real-time asset tracking dashboard with a live map and status tiles"
      className="border-border bg-card overflow-hidden rounded-xl border shadow-sm"
    >
      <div className="border-border bg-secondary/40 flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
        <span className="text-muted-foreground ml-3 font-mono text-xs">Asset Overview</span>
      </div>

      <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
        {[
          { label: "Assets Online", value: "12,458" },
          { label: "Uptime", value: "98.2%" },
          { label: "Live Markers", value: "10K+" },
          { label: "Alerts", value: "3" },
        ].map((tile) => (
          <div key={tile.label} className="bg-card border-border/60 border-b p-3">
            <p className="font-heading text-lg font-semibold sm:text-xl">{tile.value}</p>
            <p className="text-muted-foreground text-[10px] tracking-wide uppercase sm:text-xs">
              {tile.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-[1.4fr_1fr]">
        <div className="bg-secondary/20 relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-52">
          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {markers.map((marker, i) => (
            <span
              key={`${marker.x}-${marker.y}`}
              aria-hidden="true"
              className={`bg-primary absolute size-2 rounded-full ${i % 3 === 0 ? "animate-pulse" : ""}`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            />
          ))}
        </div>

        <div className="bg-card flex min-h-40 flex-col justify-between p-4">
          <p className="text-muted-foreground text-[10px] tracking-wide uppercase sm:text-xs">
            Load Performance
          </p>
          <svg viewBox="0 0 200 80" className="text-primary h-16 w-full" aria-hidden="true">
            <polyline
              points="0,60 30,55 60,40 90,45 120,25 150,30 180,10 200,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-muted-foreground text-[10px] sm:text-xs">
            +35% faster after optimization
          </p>
        </div>
      </div>
    </div>
  );
}
