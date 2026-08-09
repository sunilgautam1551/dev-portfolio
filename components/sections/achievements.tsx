import { Award, GitBranch, Sparkles, Star, Users, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { achievements } from "@/lib/content";

// Positional, matched to the order in lib/content.ts — not a cycling fallback.
const icons: LucideIcon[] = [Award, GitBranch, Users, Star, Sparkles];

export function Achievements() {
  return (
    <section id="achievements" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Achievements
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <Reveal key={achievement.title} delay={i * 0.08}>
                <GlowCard className="text-center sm:text-left">
                  <div className="bg-accent text-accent-foreground mx-auto flex size-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:mx-0">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold text-balance">
                    {achievement.title}
                  </h3>
                  <p className="text-primary mt-1 text-xs font-medium tracking-wide uppercase">
                    {achievement.org}
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
