import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { caseStudies, secondaryProjects } from "@/lib/content";

import { AnalyticsMockup } from "./case-study-visuals/analytics-mockup";
import { DashboardMockup } from "./case-study-visuals/dashboard-mockup";

export function CaseStudies() {
  return (
    <section id="projects" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed">
            Two platforms, in depth, instead of a long list of shallow ones. Visuals below are
            illustrative mockups — the underlying products are confidential.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id}>
              <article
                id={study.id}
                className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {study.visual === "dashboard" ? <DashboardMockup /> : <AnalyticsMockup />}
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-primary font-mono text-sm">
                    {String(i + 1).padStart(2, "0")} · {study.org}
                  </span>
                  <h3 className="font-heading mt-2 text-2xl font-semibold text-balance">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">{study.tagline}</p>

                  <p className="mt-5 text-sm leading-relaxed">{study.challenge}</p>

                  <p className="text-muted-foreground mt-4 text-sm">
                    <span className="text-foreground font-medium">My role — </span>
                    {study.role}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {study.problems.map((problem) => (
                      <li key={problem} className="flex gap-2.5 text-sm leading-relaxed">
                        <Check
                          className="text-primary mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-border mt-6 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4">
                    {study.results.map((result) => (
                      <div key={result.label}>
                        <p className="font-heading text-lg font-semibold text-balance sm:text-xl">
                          {result.value}
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
                        className="bg-secondary text-secondary-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-border mt-16 border-t pt-10">
            <p className="text-muted-foreground text-sm font-medium">Also built</p>
            <ul className="mt-4 space-y-3">
              {secondaryProjects.map((project) => (
                <li key={project.title} className="text-sm leading-relaxed">
                  <span className="text-foreground font-medium">{project.title}</span>
                  <span className="text-muted-foreground"> ({project.org}) — </span>
                  <span className="text-muted-foreground">{project.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
