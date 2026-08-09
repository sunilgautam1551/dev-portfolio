"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useLayoutEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(MotionPathPlugin);

/**
 * Signature hero visual: a small "component architecture" graph —
 * a hub node feeding satellite nodes, with data packets flowing along
 * the connections. Stands in for the real thing the copy talks about:
 * frontend architecture and data flow.
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

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function HeroGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(svg.querySelectorAll("[data-edge]"));
      const dots = gsap.utils.toArray<SVGCircleElement>(svg.querySelectorAll("[data-node]"));
      const packets = gsap.utils.toArray<SVGCircleElement>(svg.querySelectorAll("[data-packet]"));

      if (reduced) {
        gsap.set(paths, { opacity: 0.5 });
        gsap.set(dots, { opacity: 1, scale: 1 });
        gsap.set(packets, { opacity: 0 });
        return;
      }

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
      });
      gsap.set(dots, { scale: 0, transformOrigin: "center" });
      gsap.set(packets, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(paths, { strokeDashoffset: 0, duration: 1, stagger: 0.06 })
        .to(dots, { scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(2)" }, "-=0.6")
        .add(() => {
          packets.forEach((packet, i) => {
            const edge = edges[i % edges.length];
            const path = paths.find((p) => p.dataset.edge === `${edge[0]}-${edge[1]}`);
            if (!path) return;
            gsap.to(packet, {
              opacity: 1,
              duration: 0.3,
              onComplete: () => {
                gsap.to(packet, {
                  motionPath: {
                    path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                  },
                  duration: 2 + Math.random(),
                  repeat: -1,
                  delay: i * 0.4,
                  ease: "sine.inOut",
                });
              },
            });
          });

          gsap.to(dots, {
            filter: "drop-shadow(0 0 6px var(--primary))",
            duration: 1.4,
            stagger: { each: 0.3, repeat: -1, yoyo: true },
            ease: "sine.inOut",
          });
        });
    }, svgRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      role="img"
      aria-label="Animated diagram of connected nodes representing frontend architecture and data flow"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="hero-edge-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gradient-from)" />
          <stop offset="50%" stopColor="var(--gradient-via)" />
          <stop offset="100%" stopColor="var(--gradient-to)" />
        </linearGradient>
      </defs>

      {edges.map(([a, b]) => {
        const from = nodeById(a);
        const to = nodeById(b);
        return (
          <path
            key={`${a}-${b}`}
            data-edge={`${a}-${b}`}
            d={`M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`}
            fill="none"
            stroke="url(#hero-edge-gradient)"
            strokeOpacity={0.55}
            strokeWidth={1.75}
          />
        );
      })}

      {edges.slice(0, 5).map(([a, b], i) => (
        <circle key={`packet-${a}-${b}-${i}`} data-packet r={5} fill="url(#hero-edge-gradient)" />
      ))}

      {nodes.map((node) => (
        <circle
          key={node.id}
          data-node
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={node.id === "hub" ? "url(#hero-edge-gradient)" : "var(--card)"}
          stroke="url(#hero-edge-gradient)"
          strokeWidth={node.id === "hub" ? 0 : 2}
          style={
            node.id === "hub" ? { filter: "drop-shadow(0 0 18px var(--gradient-via))" } : undefined
          }
        />
      ))}
    </svg>
  );
}
