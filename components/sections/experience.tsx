import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience
          </h2>
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
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base leading-relaxed">
                    <span className="text-primary mt-2.5 size-1 shrink-0 rounded-full bg-current" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <li
                    key={tech}
                    className="bg-secondary text-secondary-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                  >
                    {tech}
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
