import { Reveal } from "@/components/motion/reveal";
import { experience, identity, summary } from "@/lib/content";

const quickFacts = [
  { label: "Experience", value: "5.7+ years" },
  { label: "Focus", value: "Frontend architecture & design systems" },
  { label: "Most recently", value: `${experience[0]!.role}, ${experience[0]!.company}` },
  { label: "Based in", value: identity.location },
];

export function About() {
  return (
    <section id="about" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
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
              <dl className="border-border grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-muted-foreground text-sm">{fact.label}</dt>
                    <dd className="font-heading mt-1 text-base font-medium">{fact.value}</dd>
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
