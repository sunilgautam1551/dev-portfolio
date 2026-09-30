/**
 * Fixed, full-viewport decorative layer: two large, very soft blurred blobs
 * that drift slowly, in the same hue family (no rainbow effect), plus a
 * faint grain texture. Deliberately subtle — this should read as ambient
 * depth, not a visible colored glow. Drift is a CSS keyframe animation
 * (see globals.css) so it runs on the compositor with no JS per frame, and
 * the global prefers-reduced-motion rule makes it inert.
 */
export function AmbientBackground() {
  const blobs = [
    "bg-[var(--gradient-from)] top-[-15%] left-[-10%] size-[55vw] animate-ambient-a",
    "bg-[var(--gradient-via)] bottom-[-20%] right-[-15%] size-[50vw] animate-ambient-b",
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09]">
        {blobs.map((className, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-[140px] will-change-transform ${className}`}
          />
        ))}
      </div>
      <div className="bg-grain absolute inset-0 opacity-[0.02] mix-blend-overlay dark:opacity-[0.03]" />
    </div>
  );
}
