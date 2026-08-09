import { Award } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { achievements } from "@/lib/content";

export function Achievements() {
  return (
    <section id="achievements" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Achievements
          </h2>
        </Reveal>

        <div className="border-border bg-card mt-16 divide-y rounded-xl border sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement.title} delay={i * 0.08} className="p-8">
              <Award className="text-primary size-5" aria-hidden="true" />
              <h3 className="font-heading mt-4 text-base font-semibold text-balance">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">{achievement.org}</p>
              <p className="mt-3 text-sm leading-relaxed">{achievement.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
