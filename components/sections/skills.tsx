import { Boxes, Code2, Database, LayoutGrid, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { alsoWorkedWith, homeSkillGroups } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Code2,
  Boxes,
  LayoutGrid,
  Database,
};

export function Skills() {
  return (
    <section id="skills" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Skills
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeSkillGroups.map((group, i) => {
            const Icon = icons[group.icon] ?? Code2;
            return (
              <Reveal key={group.title} delay={(i % 4) * 0.06}>
                <div className="border-border bg-card hover:border-primary/40 h-full rounded-xl border p-6 transition-colors">
                  <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold">{group.title}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="border-border mt-10 border-t pt-8">
            <p className="text-muted-foreground text-sm font-medium">Also worked with</p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {alsoWorkedWith.join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
