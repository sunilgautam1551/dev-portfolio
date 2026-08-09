"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Fixed, full-viewport decorative layer: two large, very soft blurred blobs
 * that drift slowly, in the same hue family (no rainbow effect), plus a
 * faint grain texture. Deliberately subtle — this should read as ambient
 * depth, not a visible colored glow. Fully inert under prefers-reduced-motion.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();

  const blobs = [
    {
      className: "bg-[var(--gradient-from)] top-[-15%] left-[-10%] size-[55vw]",
      animate: { x: [0, 30, -15, 0], y: [0, 20, -10, 0] },
      duration: 32,
    },
    {
      className: "bg-[var(--gradient-via)] bottom-[-20%] right-[-15%] size-[50vw]",
      animate: { x: [0, -25, 15, 0], y: [0, -15, 20, 0] },
      duration: 36,
    },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09]">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[140px] ${blob.className}`}
            animate={reduced ? undefined : blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="bg-grain absolute inset-0 opacity-[0.02] mix-blend-overlay dark:opacity-[0.03]" />
    </div>
  );
}
