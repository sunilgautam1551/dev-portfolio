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

/**
 * Hero copy animates in with pure CSS rather than framer-motion: motion's
 * `initial="hidden"` is server-rendered as `opacity: 0`, which kept the
 * headline invisible until the JS bundle hydrated — seconds on mobile.
 */
function enterDelay(i: number) {
  return { animationDelay: `${100 + i * 80}ms` };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
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

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (reduced || !spotlightRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightRef.current.style.setProperty("--x", `${event.clientX - rect.left}px`);
    spotlightRef.current.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-16"
    >
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 md:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <p
            style={enterDelay(0)}
            className="animate-hero-in text-accent-foreground font-mono text-sm font-medium tracking-wide"
          >
            {identity.title} · {identity.location}
          </p>

          <h1
            style={enterDelay(1)}
            className="animate-hero-in font-heading mt-4 text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-brand">{identity.name}</span>
          </h1>

          <p
            style={enterDelay(2)}
            className="animate-hero-in text-muted-foreground mt-6 max-w-xl text-lg text-balance sm:text-xl"
          >
            {tagline}
          </p>

          <div
            style={enterDelay(3)}
            className="animate-hero-in mt-8 flex flex-wrap gap-2"
          >
            {heroTechTags.map((tag) => (
              <span
                key={tag}
                className="border-primary/25 bg-accent text-accent-foreground rounded-full border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            style={enterDelay(4)}
            className="animate-hero-in text-muted-foreground mt-4 font-mono text-xs tracking-wide sm:text-sm"
          >
            {heroStats.join(" · ")}
          </p>

          <div
            style={enterDelay(5)}
            className="animate-hero-in mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" className="shadow-glow">
              <Link href="/#projects">
                View Work
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        <div
          ref={graphicRef}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="bg-gradient-brand absolute inset-[8%] -z-10 rounded-full opacity-20 blur-3xl"
          />
          <HeroGraphic />
        </div>
      </div>

      <div
        style={{ animationDelay: "1s" }}
        className="animate-hero-in text-muted-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs sm:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
      </div>
    </section>
  );
}
