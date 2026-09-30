import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { experience } from "@/lib/content";

const HOME_HIGHLIGHT_COUNT = 3;

export function Experience() {
  return (
    <section id="experience" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <SectionEyebrow id="experience" />
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Experience
            </h2>
            <Button asChild variant="outline" className="h-10 px-4 text-base">
              <Link href="/resume">
                Full resume
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Timeline: a gradient rail on the left with a node per role; the
            current role's node pulses. */}
        <ol className="relative mt-12 space-y-6 pl-8 sm:pl-10">
          <span
            aria-hidden="true"
            className="from-primary/60 via-border absolute top-2 bottom-2 left-[7px] w-px bg-linear-to-b to-transparent sm:left-[11px]"
          />
          {experience.map((entry, i) => {
            const [lead, ...supporting] = entry.highlights.slice(0, HOME_HIGHLIGHT_COUNT);
            const isCurrent = /present/i.test(entry.period);
            return (
              <Reveal key={entry.company} delay={i * 0.08} as="li" className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-7 -left-8 flex size-[15px] items-center justify-center sm:-left-10 sm:size-[23px]"
                >
                  {isCurrent && (
                    <span className="bg-primary/40 absolute inset-0 animate-ping rounded-full" />
                  )}
                  <span
                    className={`border-background relative size-full rounded-full border-4 ${
                      isCurrent ? "bg-gradient-brand" : "bg-muted-foreground/40"
                    }`}
                  />
                </span>
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
                    <div className="flex shrink-0 items-center gap-2">
                      {isCurrent && (
                        <span className="border-primary/30 bg-accent text-accent-foreground rounded-full border px-3 py-1 text-xs font-medium">
                          Current
                        </span>
                      )}
                      <span className="border-border bg-secondary text-secondary-foreground rounded-full border px-3 py-1 font-mono text-xs font-medium">
                        {entry.period}
                      </span>
                    </div>
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
        </ol>
      </div>
    </section>
  );
}
