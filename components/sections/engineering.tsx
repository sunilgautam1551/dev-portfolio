import { Boxes, Gauge, LayoutGrid, ShieldCheck, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
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
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            How I Build
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            The engineering priorities behind every project below.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {engineeringPillars.map((pillar, i) => {
            const Icon = icons[pillar.icon] ?? Boxes;
            return (
              <Reveal key={pillar.title} delay={(i % 2) * 0.08}>
                <div className="border-border bg-card hover:border-primary/40 h-full rounded-xl border p-6 transition-colors">
                  <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold">{pillar.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
