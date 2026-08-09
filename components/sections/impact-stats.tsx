import { Reveal } from "@/components/motion/reveal";
import { impactStats } from "@/lib/content";

export function ImpactStats() {
  return (
    <section aria-label="Impact at a glance" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {impactStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="text-center sm:text-left">
              <p className="font-heading text-primary text-4xl font-semibold tracking-tight sm:text-5xl">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-2 text-xs font-medium tracking-wide uppercase sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
