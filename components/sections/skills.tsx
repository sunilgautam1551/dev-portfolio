import { Boxes, Check, Code2, Database, LayoutGrid, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { Marquee } from "@/components/ui/marquee";
import { alsoWorkedWith, homeSkillGroups } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Boxes,
  LayoutGrid,
  Database,
};

// Bento spans for [Architecture, Enterprise UI, Backend] — Core is handled
// separately as the featured card.
const spans = ["lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export function Skills() {
  const [core, ...rest] = homeSkillGroups;

  return (
    <section id="skills" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Skills
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            The stack I reach for daily, and everything else I&apos;ve shipped with along the way.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {core && (
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <div className="bg-primary text-primary-foreground relative flex h-full flex-col overflow-hidden rounded-xl p-8">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-2xl"
                />
                <span className="relative font-mono text-xs font-medium tracking-wide uppercase opacity-80">
                  Daily driver
                </span>
                <h3 className="font-heading relative mt-3 text-2xl font-semibold sm:text-3xl">
                  {core.title}
                </h3>
                <div className="relative mt-8 grid grid-cols-2 gap-4">
                  {core.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {rest.map((group, i) => {
            const Icon = icons[group.icon] ?? Code2;
            return (
              <Reveal key={group.title} delay={0.06 + i * 0.06} className={spans[i]}>
                <GlowCard>
                  <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold">{group.title}</h3>
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
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <p className="text-muted-foreground mb-5 text-sm font-medium">Also worked with</p>
          <div className="space-y-3">
            <Marquee items={alsoWorkedWith.slice(0, Math.ceil(alsoWorkedWith.length / 2))} />
            <Marquee
              items={alsoWorkedWith.slice(Math.ceil(alsoWorkedWith.length / 2))}
              reverse
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
