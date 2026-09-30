import { Check, ExternalLink, Layers } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { caseStudies, secondaryProjects } from "@/lib/content";

import { AnimatedStatValue } from "./animated-stat-value";
import { AnalyticsMockup } from "./case-study-visuals/analytics-mockup";
import { CanvasMockup } from "./case-study-visuals/canvas-mockup";
import { DashboardMockup } from "./case-study-visuals/dashboard-mockup";
import { DocsMockup } from "./case-study-visuals/docs-mockup";

const mockups = {
  dashboard: DashboardMockup,
  analytics: AnalyticsMockup,
  docs: DocsMockup,
  canvas: CanvasMockup,
};

export function CaseStudies() {
  return (
    <section id="projects" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <SectionEyebrow id="projects" />
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            A few platforms, in depth, instead of a long list of shallow ones. Visuals below are
            illustrative mockups — Dot Oracle and the Docs Portal are confidential, but CoBoard is
            live and open to try.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24">
          {caseStudies.map((study, i) => {
            const Mockup = mockups[study.visual];
            return (
              <Reveal key={study.id}>
                <article
                  id={study.id}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div
                    className={`group transition-transform duration-500 hover:-translate-y-1 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="bg-primary absolute -inset-4 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
                      />
                      <Mockup />
                    </div>
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="text-accent-foreground font-mono text-sm">
                      {String(i + 1).padStart(2, "0")} · {study.org}
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="font-heading text-2xl font-semibold text-balance sm:text-3xl">
                        {study.title}
                      </h3>
                      {study.link && (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                        >
                          {study.linkLabel ?? "Live demo"}
                          <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-base">{study.tagline}</p>

                    <p className="mt-5 text-base leading-relaxed">{study.challenge}</p>

                    <p className="text-muted-foreground mt-4 text-base">
                      <span className="text-foreground font-medium">My role — </span>
                      {study.role}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {study.problems.map((problem) => (
                        <li key={problem} className="flex gap-2.5 text-base leading-relaxed">
                          <Check className="text-primary mt-1 size-4 shrink-0" aria-hidden="true" />
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-border mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t pt-6 sm:grid-cols-4">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <p className="text-accent-foreground font-heading text-lg font-bold text-balance tabular-nums sm:text-xl">
                            <AnimatedStatValue value={result.value} />
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs leading-snug">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <li
                          key={tech}
                          className="border-border bg-secondary text-secondary-foreground rounded-md border px-2.5 py-1 text-xs font-medium"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {secondaryProjects.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-16">
              <p className="text-muted-foreground mb-4 text-sm font-medium">Also built</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {secondaryProjects.map((project) => (
                  <GlowCard key={project.title} className="flex gap-4">
                    <div className="bg-accent text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Layers className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-heading text-base font-semibold">
                        {project.title}
                        <span className="text-muted-foreground ml-2 text-sm font-normal">
                          {project.org}
                        </span>
                      </p>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
