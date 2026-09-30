import {
  Activity,
  LayoutDashboard,
  Map as MapIcon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Signature hero visual: a live diagram of the kind of system the copy
 * describes — an app shell hosting independently mounted micro-frontends,
 * built on a shared design system, a state/cache layer and real-time APIs,
 * with data flowing up through the layers.
 *
 * It assembles from the foundation up (APIs first, modules last), and each
 * module "mounts" from a loading skeleton. Pure CSS/HTML (keyframes in
 * globals.css, `.arch-*`) — no JS, starts on first paint. Layers sit at
 * different Z depths, so the Hero's pointer tilt gives real parallax.
 */

const SHELL_DELAY = 0.75;
const MODULE_START = 1.15;
const MODULE_STAGGER = 0.18;
const FLOW_START = 1.6;

function delay(seconds: number): CSSProperties {
  return { animationDelay: `${seconds}s` };
}

/* ---- Module visuals ------------------------------------------------- */

const BAR_HEIGHTS = [55, 80, 45, 95, 65, 75];

function DashboardVisual() {
  return (
    <div className="flex h-full items-end gap-1">
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="arch-bar bg-gradient-brand flex-1 rounded-t-sm opacity-80"
          style={{
            height: `${h}%`,
            animationDelay: `${i * -0.45}s`,
            animationDuration: `${2 + (i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

const MARKERS = [
  { left: 22, top: 35 },
  { left: 58, top: 62 },
  { left: 80, top: 28 },
];

function MapVisual() {
  return (
    <div className="bg-dot-grid-sm relative h-full overflow-hidden rounded-md">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path
          d="M0 30 C 20 24, 30 10, 50 16 S 80 34, 100 12"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {MARKERS.map((m, i) => (
        <span
          key={i}
          className="absolute size-2 -translate-1/2"
          style={{ left: `${m.left}%`, top: `${m.top}%` }}
        >
          <span
            className="bg-primary/50 absolute inset-0 animate-ping rounded-full"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <span className="bg-gradient-brand relative block size-2 rounded-full" />
        </span>
      ))}
    </div>
  );
}

function AnalyticsVisual() {
  const line = "M0 32 L14 26 L28 29 L42 17 L56 21 L70 9 L84 13 L100 4";
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full overflow-visible">
      <defs>
        <linearGradient id="arch-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gradient-via)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--gradient-via)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arch-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--gradient-from)" />
          <stop offset="100%" stopColor="var(--gradient-to)" />
        </linearGradient>
      </defs>
      <path d={`${line} L100 40 L0 40 Z`} fill="url(#arch-area)" className="arch-area" />
      <path
        d={line}
        pathLength={1}
        fill="none"
        stroke="url(#arch-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="arch-spark"
      />
    </svg>
  );
}

const ROLES = ["Admin", "Editor", "Viewer"];

function AccessVisual() {
  return (
    <ul className="flex h-full flex-col justify-between">
      {ROLES.map((role, i) => (
        <li key={role} className="flex items-center gap-1.5">
          <span
            className="arch-role bg-gradient-brand size-1.5 shrink-0 rounded-full"
            style={{ animationDelay: `${i * 1.2}s` }}
          />
          <span className="text-muted-foreground font-mono text-[9px] leading-none">{role}</span>
          <span className="bg-border ml-auto h-1 w-8 overflow-hidden rounded-full sm:w-10">
            <span
              className="arch-role bg-gradient-brand block h-full rounded-full"
              style={{ width: `${90 - i * 25}%`, animationDelay: `${i * 1.2}s` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

const modules: { name: string; icon: LucideIcon; visual: () => ReactNode }[] = [
  { name: "dashboards", icon: LayoutDashboard, visual: DashboardVisual },
  { name: "live-maps", icon: MapIcon, visual: MapVisual },
  { name: "analytics", icon: Activity, visual: AnalyticsVisual },
  { name: "access", icon: ShieldCheck, visual: AccessVisual },
];

/* ---- Foundation layers ---------------------------------------------- */

const layers: {
  label: string;
  chips: { text: string; live?: boolean; swatch?: boolean }[];
  depth: number;
  delay: number;
}[] = [
  {
    label: "Design System",
    chips: [{ text: "Tokens", swatch: true }, { text: "Components" }],
    depth: 28,
    delay: 0.6,
  },
  {
    label: "State & Cache",
    chips: [{ text: "Query cache" }, { text: "Global store" }],
    depth: 14,
    delay: 0.45,
  },
  {
    label: "APIs",
    chips: [{ text: "REST" }, { text: "GraphQL" }, { text: "WebSocket", live: true }],
    depth: 0,
    delay: 0.3,
  },
];

/** Gap between layers with dots rising through it — data flowing up to the UI. */
function Flow({ index }: { index: number }) {
  return (
    <div className="relative mx-auto h-6 w-3/4">
      {[18, 50, 82].map((left, i) => (
        <span key={left} className="absolute inset-y-0" style={{ left: `${left}%` }}>
          <span className="border-primary/25 absolute inset-y-0 border-l border-dashed" />
          <span
            className="arch-flow absolute inset-x-0 bottom-0 h-full"
            style={delay(FLOW_START + index * 0.25 + i * 0.4)}
          >
            <span className="bg-gradient-brand absolute bottom-0 -left-[2.5px] size-1.5 rounded-full shadow-[0_0_8px_var(--gradient-via)]" />
          </span>
        </span>
      ))}
    </div>
  );
}

export function HeroGraphic() {
  return (
    <div
      role="img"
      aria-label="Animated diagram of a micro-frontend architecture: an app shell hosting four independently mounted modules, built on a shared design system, a state and cache layer, and REST, GraphQL and WebSocket APIs, with data flowing up to the UI"
      className="arch relative w-full"
    >
      <div aria-hidden="true">
        {/* App shell hosting the micro-frontends */}
        <div
          className="arch-layer border-border bg-card/85 shadow-elevated rounded-2xl border p-3 backdrop-blur-md sm:p-4"
          style={{ ...delay(SHELL_DELAY), translate: "0 0 42px" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="bg-muted-foreground/30 size-2 rounded-full" />
              ))}
            </span>
            <span className="bg-secondary text-muted-foreground ml-1 flex-1 truncate rounded-md px-2 py-1 font-mono text-[10px]">
              app-shell <span className="text-primary">/</span> host
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10px] whitespace-nowrap">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              {modules.length} MFEs
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-2.5">
            {modules.map((mod, i) => {
              const mount = MODULE_START + i * MODULE_STAGGER;
              const Visual = mod.visual;
              return (
                <div
                  key={mod.name}
                  className="border-border bg-background/60 relative overflow-hidden rounded-xl border p-2.5"
                >
                  {/* Loading skeleton, cleared as the module "mounts" */}
                  <div
                    className="arch-skeleton bg-secondary absolute inset-0 z-10"
                    style={{ animationDelay: `0s, ${mount}s` }}
                  />
                  <div className="animate-hero-in" style={delay(mount + 0.1)}>
                    <div className="flex items-center gap-1.5">
                      <mod.icon className="text-accent-foreground size-3" />
                      <span className="text-foreground truncate font-mono text-[10px] font-medium">
                        {mod.name}
                      </span>
                      <span className="border-primary/30 text-accent-foreground ml-auto rounded border px-1 font-mono text-[8px] leading-tight">
                        MFE
                      </span>
                    </div>
                    <div className="mt-2 h-10 sm:h-12">
                      <Visual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {layers.map((layer, i) => (
          <div key={layer.label}>
            <Flow index={i} />
            <div
              className="arch-layer border-border bg-card/75 flex items-center gap-3 rounded-xl border px-3 py-2.5 backdrop-blur-md sm:px-4"
              style={{ ...delay(layer.delay), translate: `0 0 ${layer.depth}px` }}
            >
              <span className="text-accent-foreground font-mono text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
                {layer.label}
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                {layer.chips.map((chip) => (
                  <span
                    key={chip.text}
                    className="border-border bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] whitespace-nowrap"
                  >
                    {chip.swatch && (
                      <span className="flex -space-x-1">
                        {["--gradient-from", "--gradient-via", "--gradient-to"].map((v) => (
                          <span
                            key={v}
                            className="ring-secondary size-2 rounded-full ring-1"
                            style={{ background: `var(${v})` }}
                          />
                        ))}
                      </span>
                    )}
                    {chip.live && (
                      <span className="relative flex size-1.5">
                        <span className="bg-primary/60 absolute inset-0 animate-ping rounded-full" />
                        <span className="bg-primary relative size-1.5 rounded-full" />
                      </span>
                    )}
                    {chip.text}
                  </span>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
