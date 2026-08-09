import {
  BarChart3,
  Boxes,
  Code2,
  Database,
  FlaskConical,
  Palette,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { skillGroups } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "Languages & Frameworks": Code2,
  "State & Data": Database,
  "UI & Styling": Palette,
  "Data Visualization": BarChart3,
  "Testing & Quality": FlaskConical,
  "Architecture & Performance": Boxes,
  Tooling: Wrench,
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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.category] ?? Code2;
            return (
              <Reveal key={group.category} delay={(i % 3) * 0.06}>
                <div className="border-border bg-card hover:border-primary/40 h-full rounded-xl border p-6 transition-colors">
                  <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold">{group.category}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="bg-secondary text-secondary-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
