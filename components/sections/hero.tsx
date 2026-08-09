"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { heroStats, heroTechTags, identity, tagline } from "@/lib/content";

import { HeroGraphic } from "./hero-graphic";

gsap.registerPlugin(ScrollTrigger);

const textVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !graphicRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(graphicRef.current, {
        yPercent: 12,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-primary font-mono text-sm font-medium tracking-wide"
          >
            {identity.title} · {identity.location}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="font-heading mt-4 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {identity.name}
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-muted-foreground mt-6 max-w-xl text-lg text-balance sm:text-xl"
          >
            {tagline}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-8 flex flex-wrap gap-2"
          >
            {heroTechTags.map((tag) => (
              <span
                key={tag}
                className="border-primary/25 bg-accent text-accent-foreground rounded-full border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-muted-foreground mt-4 font-mono text-xs tracking-wide sm:text-sm"
          >
            {heroStats.join(" · ")}
          </motion.p>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/#projects">
                View Work
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>

        <div ref={graphicRef} className="mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <HeroGraphic />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-muted-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs sm:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.div>
    </section>
  );
}
