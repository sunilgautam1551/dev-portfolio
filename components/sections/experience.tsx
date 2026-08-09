import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
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
            <Link
              href="/resume"
              className="text-primary hover:text-primary/80 focus-visible:outline-ring inline-flex items-center gap-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Full resume
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <ol className="border-border relative mt-16 space-y-16 border-l pl-8 sm:pl-10">
          {experience.map((entry, i) => (
            <Reveal as="li" key={entry.company} delay={i * 0.08} className="relative">
              <span
                className="bg-primary ring-background absolute top-1.5 -left-[calc(2rem+5px)] size-2.5 rounded-full ring-4 sm:-left-[calc(2.5rem+5px)]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading text-xl font-semibold">
                  {entry.role} · {entry.company}
                </h3>
                <p className="text-muted-foreground font-mono text-sm">{entry.period}</p>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{entry.location}</p>

              <ul className="mt-5 space-y-3">
                {entry.highlights.slice(0, HOME_HIGHLIGHT_COUNT).map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base leading-relaxed">
                    <span className="text-primary mt-2.5 size-1 shrink-0 rounded-full bg-current" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
