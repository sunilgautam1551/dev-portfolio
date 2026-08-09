"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Splits "13/17" -> ["13", "/", "17"], "30%" -> ["30", "%"], flagging which parts are numeric. */
function parseSegments(value: string) {
  return value
    .split(/(\d+)/)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, isNumber: /^\d+$/.test(part) }));
}

export function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const segments = parseSegments(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <span ref={ref}>
      {segments.map((segment, i) =>
        segment.isNumber ? (
          <span key={i}>{Math.round(Number(segment.text) * progress)}</span>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </span>
  );
}
