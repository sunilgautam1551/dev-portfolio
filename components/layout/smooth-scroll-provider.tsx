"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
