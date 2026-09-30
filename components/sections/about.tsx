import { Briefcase, Clock, MapPin, Target, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { experience, identity, summary } from "@/lib/content";

const quickFacts: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Experience", value: "6 years", icon: Clock },
  { label: "Focus", value: "Frontend architecture & design systems", icon: Target },
  {
    label: "Most recently",
    value: `${experience[0]!.role}, ${experience[0]!.company}`,
    icon: Briefcase,
  },
  { label: "Based in", value: identity.location, icon: MapPin },
];

export function About() {
  return (
    <section id="about" className="border-border scroll-mt-16 border-t">
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="bg-primary/20 pointer-events-none absolute top-0 left-1/4 -z-10 size-72 rounded-full opacity-0 blur-[100px] dark:opacity-100"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow id="about" />
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              About
            </h2>
          </Reveal>

          <div className="space-y-10">
            <Reveal>
              <p className="text-foreground text-lg leading-relaxed text-balance sm:text-xl">
                {summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickFacts.map((fact) => (
                  // A <dl> group may only hold <dt>/<dd>, so the icon lives inside
                  // the <dt> and is positioned against the card.
                  <div
                    key={fact.label}
                    className="border-border bg-card hover:border-primary/30 relative rounded-xl border p-4 pl-16 transition-colors"
                  >
                    <dt className="text-muted-foreground text-sm">
                      <span className="bg-accent text-accent-foreground absolute top-4 left-4 flex size-9 items-center justify-center rounded-lg">
                        <fact.icon className="size-4.5" aria-hidden="true" />
                      </span>
                      {fact.label}
                    </dt>
                    <dd className="font-heading mt-0.5 text-base font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
