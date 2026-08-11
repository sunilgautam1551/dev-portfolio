/**
 * Illustrative, generic UI — but unlike the other mockups this one stands in
 * for a real, live product (CoBoard). Shows the actual interaction model:
 * hand-drawn (rough.js-style) shapes, a bound text label, and two remote
 * cursors with name tags to sell "real-time multiplayer" at a glance.
 */
const cursors = [
  { x: 66, y: 24, name: "Maya", color: "var(--color-primary)" },
  { x: 30, y: 74, name: "Theo", color: "#f59e0b" },
];

export function CanvasMockup() {
  return (
    <div
      role="img"
      aria-label="Illustrative mockup of a real-time multiplayer whiteboard with hand-drawn shapes and two remote collaborator cursors"
      className="border-border bg-card overflow-hidden rounded-xl border shadow-sm"
    >
      <div className="border-border bg-secondary/40 flex items-center justify-between gap-1.5 border-b px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
          <span className="text-muted-foreground ml-3 font-mono text-xs">
            canvasroom.vercel.app
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      <div className="bg-secondary/10 relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-64">
        <svg
          className="text-muted-foreground/40 absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="canvas-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#canvas-dots)" />
        </svg>

        <svg
          viewBox="0 0 320 220"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 28 118 C 26 84, 30 58, 32 56 C 70 51, 118 53, 148 55 C 151 82, 149 116, 147 140 C 108 144, 62 143, 30 141 C 28 134, 27 124, 28 118 Z"
            fill="var(--color-primary)"
            fillOpacity="0.08"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="88"
            y="102"
            textAnchor="middle"
            className="fill-foreground font-sans"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            Ship v2
          </text>

          <path
            d="M 210 40 L 268 78 L 212 118 L 156 80 Z"
            fill="#f59e0b"
            fillOpacity="0.1"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <path
            d="M 152 92 C 170 108, 186 118, 202 124"
            fill="none"
            stroke="currentColor"
            className="text-muted-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 196 118 L 202 124 L 194 128"
            fill="none"
            stroke="currentColor"
            className="text-muted-foreground"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 60 168 C 90 158, 112 172, 140 162 C 168 152, 190 170, 214 160"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {cursors.map((cursor) => (
          <div
            key={cursor.name}
            className="absolute flex items-center gap-1.5"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="drop-shadow-sm"
            >
              <path
                d="M1 1L6.5 14.5L8.5 8.5L14.5 6.5L1 1Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="rounded-full px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap text-white shadow-sm"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </span>
          </div>
        ))}

        <div className="absolute right-3 bottom-3 flex -space-x-2">
          {["M", "T", "A"].map((initial, i) => (
            <span
              key={initial}
              className="border-card flex size-6 items-center justify-center rounded-full border-2 bg-secondary text-[10px] font-semibold"
              style={{ zIndex: 3 - i }}
            >
              {initial}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
