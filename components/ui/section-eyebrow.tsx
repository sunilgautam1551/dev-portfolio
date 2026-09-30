import { navSections } from "@/lib/content";

/**
 * Small "01 ——" marker above each section heading. The number comes from
 * the section's position in `navSections`, so it always matches the nav.
 */
export function SectionEyebrow({ id }: { id: string }) {
  const index = navSections.findIndex((section) => section.id === id);
  if (index === -1) return null;

  return (
    <p
      aria-hidden="true"
      className="text-accent-foreground mb-4 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em]"
    >
      {String(index + 1).padStart(2, "0")}
      <span className="bg-gradient-brand h-px w-10 opacity-70" />
    </p>
  );
}
