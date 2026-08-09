import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="projects" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="border-border bg-card hover:border-primary/40 flex h-full flex-col rounded-xl border p-8 transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-heading text-xl font-semibold text-balance">
                    {project.title}
                  </h3>
                  <span className="text-primary font-mono text-sm">{project.org}</span>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="text-primary mt-2 size-1 shrink-0 rounded-full bg-current" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
