"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for every `.spotlight` card on the page
 * (instead of a handler per card): writes the cursor position into the
 * hovered card's `--mx/--my`, which its CSS glow reads. Only attaches on
 * devices with a fine, hover-capable pointer — touch screens skip it.
 */
export function PointerSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function onMove(event: PointerEvent) {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
