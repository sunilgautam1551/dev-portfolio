/**
 * Signature hero visual: a small "component architecture" graph —
 * a hub node feeding satellite nodes, with data packets flowing along
 * the connections. Stands in for the real thing the copy talks about:
 * frontend architecture and data flow.
 *
 * Animated entirely declaratively (CSS keyframes in globals.css for the
 * draw-in, orbits and twinkle; SMIL <animateMotion> for the packets and
 * their comet trails), so it ships zero JS, starts on first paint and never
 * waits for hydration. The pointer tilt is applied by the parent Hero.
 */
const nodes = [
  { id: "hub", cx: 300, cy: 300, r: 22 },
  { id: "n1", cx: 120, cy: 150, r: 12 },
  { id: "n2", cx: 300, cy: 90, r: 12 },
  { id: "n3", cx: 470, cy: 150, r: 12 },
  { id: "n4", cx: 500, cy: 320, r: 12 },
  { id: "n5", cx: 380, cy: 480, r: 12 },
  { id: "n6", cx: 190, cy: 460, r: 12 },
  { id: "n7", cx: 90, cy: 300, r: 12 },
];

const edges: [string, string][] = [
  ["hub", "n1"],
  ["hub", "n2"],
  ["hub", "n3"],
  ["hub", "n4"],
  ["hub", "n5"],
  ["hub", "n6"],
  ["hub", "n7"],
  ["n1", "n2"],
  ["n3", "n4"],
  ["n5", "n6"],
];

// Timeline (seconds): edges draw 0 → ~1.5, nodes pop from ~0.9, packets start after.
const EDGE_STAGGER = 0.06;
const NODE_START = 0.9;
const NODE_STAGGER = 0.05;
const PACKET_START = 1.7;
const PACKET_STAGGER = 0.4;

// Comet trail behind each packet: [lag (s), radius, opacity].
const TRAIL = [
  [0, 5, 1],
  [0.06, 3.6, 0.5],
  [0.12, 2.4, 0.25],
] as const;

// Dashed rings centred on the hub (which sits at the viewBox centre).
const ORBITS = [
  { r: 125, dash: "2 9", speed: "70s", turn: "360deg", delay: 1.2 },
  { r: 245, dash: "1 14", speed: "110s", turn: "-360deg", delay: 1.5 },
];

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!;
}

function edgeId(a: string, b: string) {
  return `hero-edge-${a}-${b}`;
}

export function HeroGraphic() {
  const hub = nodeById("hub");

  return (
    <svg
      viewBox="0 0 600 600"
      role="img"
      aria-label="Animated diagram of connected nodes representing frontend architecture and data flow"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="hero-edge-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gradient-from)" />
          <stop offset="50%" stopColor="var(--gradient-via)" />
          <stop offset="100%" stopColor="var(--gradient-to)" />
        </linearGradient>
      </defs>

      {ORBITS.map((orbit) => (
        <circle
          key={orbit.r}
          className="hero-orbit"
          style={
            {
              "--orbit-speed": orbit.speed,
              "--orbit-turn": orbit.turn,
              animationDelay: `${orbit.delay}s, 0s`,
            } as React.CSSProperties
          }
          cx={hub.cx}
          cy={hub.cy}
          r={orbit.r}
          fill="none"
          stroke="url(#hero-edge-gradient)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray={orbit.dash}
          strokeLinecap="round"
        />
      ))}

      {edges.map(([a, b], i) => {
        const from = nodeById(a);
        const to = nodeById(b);
        return (
          <path
            key={edgeId(a, b)}
            id={edgeId(a, b)}
            className="hero-edge"
            style={{ animationDelay: `${i * EDGE_STAGGER}s` }}
            pathLength={1}
            d={`M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`}
            fill="none"
            stroke="url(#hero-edge-gradient)"
            strokeOpacity={0.55}
            strokeWidth={1.75}
          />
        );
      })}

      {[0, 1.6].map((offset) => (
        <circle
          key={offset}
          className="hero-ping"
          style={{ animationDelay: `${NODE_START + 0.6 + offset}s` }}
          cx={hub.cx}
          cy={hub.cy}
          r={hub.r}
          fill="none"
          stroke="var(--gradient-via)"
          strokeWidth={1.5}
        />
      ))}

      {edges.slice(0, 5).flatMap(([a, b], i) => {
        const dur = `${2.2 + (i % 3) * 0.35}s`;
        return TRAIL.map(([lag, r, opacity]) => {
          const begin = PACKET_START + i * PACKET_STAGGER + lag;
          return (
            <circle
              key={`packet-${a}-${b}-${lag}`}
              className="hero-packet"
              style={{ animationDelay: `${begin}s` }}
              r={r}
              fill="url(#hero-edge-gradient)"
              fillOpacity={opacity}
            >
              <animateMotion
                dur={dur}
                begin={`${begin}s`}
                repeatCount="indefinite"
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.45 0 0.55 1"
              >
                <mpath href={`#${edgeId(a, b)}`} />
              </animateMotion>
            </circle>
          );
        });
      })}

      {nodes.map((node, i) => {
        const isHub = node.id === "hub";
        return (
          <g
            key={node.id}
            className="hero-node"
            style={{ animationDelay: `${NODE_START + i * NODE_STAGGER}s` }}
          >
            <circle
              style={isHub ? { filter: "drop-shadow(0 0 18px var(--gradient-via))" } : undefined}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={isHub ? "url(#hero-edge-gradient)" : "var(--card)"}
              stroke="url(#hero-edge-gradient)"
              strokeWidth={isHub ? 0 : 2}
            />
            {!isHub && (
              <circle
                className="hero-twinkle"
                style={{ animationDelay: `${i * -0.6}s` }}
                cx={node.cx}
                cy={node.cy}
                r={4}
                fill="url(#hero-edge-gradient)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
