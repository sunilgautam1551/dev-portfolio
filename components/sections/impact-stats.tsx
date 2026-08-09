import { AnimatedStatValue } from "@/components/sections/animated-stat-value";
import { Reveal } from "@/components/motion/reveal";
import { impactStats } from "@/lib/content";

export function ImpactStats() {
  return (
    <section aria-label="Impact at a glance" className="border-border relative border-t">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {impactStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="border-border/60 hover:border-primary/30 bg-card/40 group relative overflow-hidden rounded-xl border p-5 text-center transition-colors sm:p-6 sm:text-left">
                <p className="text-accent-foreground font-heading relative text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                  <AnimatedStatValue value={stat.value} />
                </p>
                <p className="text-muted-foreground relative mt-2 text-xs font-medium tracking-wide uppercase sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
