import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { experience } from "@/lib/content";

const HOME_HIGHLIGHT_COUNT = 3;

export function Experience() {
  return (
    <section id="experience" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Experience
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/resume">
                Full resume
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 space-y-6">
          {experience.map((entry, i) => {
            const [lead, ...supporting] = entry.highlights.slice(0, HOME_HIGHLIGHT_COUNT);
            return (
              <Reveal key={entry.company} delay={i * 0.08}>
                <GlowCard>
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                        {entry.company}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {entry.role} · {entry.location}
                      </p>
                    </div>
                    <span className="bg-secondary text-secondary-foreground shrink-0 rounded-full px-3 py-1 font-mono text-xs font-medium">
                      {entry.period}
                    </span>
                  </div>

                  {lead && (
                    <p className="border-primary/40 mt-6 border-l-2 pl-4 text-base leading-relaxed text-balance sm:text-lg">
                      {lead}
                    </p>
                  )}

                  {supporting.length > 0 && (
                    <p className="text-muted-foreground mt-4 pl-4.5 text-sm leading-relaxed">
                      {supporting.join("  ·  ")}
                    </p>
                  )}
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
