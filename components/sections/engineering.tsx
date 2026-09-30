import { Boxes, Gauge, LayoutGrid, ShieldCheck, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { engineeringPillars } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Boxes,
  Gauge,
  LayoutGrid,
  ShieldCheck,
};

export function Engineering() {
  return (
    <section id="engineering" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <SectionEyebrow id="engineering" />
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            How I Build
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            The engineering priorities behind every project below.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringPillars.map((pillar, i) => {
            const Icon = icons[pillar.icon] ?? Boxes;
            return (
              <Reveal key={pillar.title} delay={(i % 4) * 0.06}>
                <GlowCard className="flex flex-col">
                  <span className="text-accent-foreground font-mono text-xs font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="bg-accent text-accent-foreground ring-border mt-4 flex size-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-semibold">{pillar.title}</h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
