"use client";

import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";

import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { heroFocusAreas, heroMetrics, identity, tagline } from "@/lib/content";

import { HeroGraphic } from "./hero-graphic";

/**
 * Every hero animation is pure CSS (keyframes in globals.css), never
 * framer-motion: motion's `initial="hidden"` is server-rendered as
 * `opacity: 0`, which kept the hero invisible until the JS bundle
 * hydrated — seconds on mobile. CSS starts on first paint.
 */
function enterDelay(i: number): CSSProperties {
  return { animationDelay: `${100 + i * 90}ms` };
}

/** Max tilt (degrees) of the hero diagram as the pointer moves across the hero. */
const MAX_TILT = 10;

const socials = [
  { label: "GitHub", href: identity.github, icon: GithubIcon },
  { label: "LinkedIn", href: identity.linkedin, icon: LinkedinIcon },
];

export function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightRef.current?.style.setProperty("--x", `${event.clientX - rect.left}px`);
    spotlightRef.current?.style.setProperty("--y", `${event.clientY - rect.top}px`);

    // 3D tilt: the diagram leans toward the pointer; its layers sit at
    // different Z depths, so they parallax against each other. Only transforms, so it
    // stays on the compositor; skipped under reduced motion.
    const tilt = tiltRef.current;
    if (!tilt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.style.setProperty("--tilt-x", `${(-py * MAX_TILT).toFixed(2)}deg`);
    tilt.style.setProperty("--tilt-y", `${(px * MAX_TILT).toFixed(2)}deg`);
  }

  function handleMouseLeave() {
    tiltRef.current?.style.setProperty("--tilt-x", "0deg");
    tiltRef.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-16"
    >
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0" />
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 md:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div>
          {/* Role badge */}
          <p
            style={enterDelay(0)}
            className="animate-hero-in border-primary/25 bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-1.5 text-xs whitespace-nowrap shadow-sm backdrop-blur sm:gap-2.5 sm:pr-4 sm:text-sm"
          >
            <span className="bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 font-medium">
              <span className="relative flex size-2">
                <span className="bg-primary absolute inset-0 animate-ping rounded-full opacity-60" />
                <span className="bg-gradient-brand relative size-2 rounded-full" />
              </span>
              {identity.title}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {identity.location}
            </span>
          </p>

          {/* Name */}
          <h1
            style={{ animationDelay: "180ms" }}
            className="hero-name font-heading mt-7 pb-1 text-6xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-gradient-brand animate-gradient-pan">{identity.name}</span>
          </h1>

          {/* Rotating focus line */}
          <p
            style={enterDelay(3)}
            className="animate-hero-in font-heading mt-5 flex flex-col text-2xl font-semibold tracking-tight sm:flex-row sm:gap-2.5 sm:text-3xl"
          >
            <span className="sr-only">
              Building {heroFocusAreas.slice(0, -1).join(", ")}, and{" "}
              {heroFocusAreas[heroFocusAreas.length - 1]}.
            </span>
            <span aria-hidden="true" className="text-muted-foreground leading-[1.25em]">
              Building
            </span>
            <span aria-hidden="true" className="hero-rotator">
              <span className="hero-rotator-track flex flex-col">
                {[...heroFocusAreas, heroFocusAreas[0]].map((area, i) => (
                  <span key={i} className="text-foreground whitespace-nowrap">
                    {area}
                    <span className="text-primary">.</span>
                  </span>
                ))}
              </span>
            </span>
          </p>

          {/* Tagline */}
          <p
            style={enterDelay(4)}
            className="animate-hero-in text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty"
          >
            {tagline}
          </p>

          {/* Actions */}
          <div
            style={enterDelay(5)}
            className="animate-hero-in mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#projects"
              className="btn-shine bg-primary text-primary-foreground shadow-glow group inline-flex h-12 items-center gap-2 rounded-xl px-6 text-base font-medium transition-transform hover:-translate-y-0.5"
            >
              View Work
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/#contact"
              className="border-border bg-card/60 hover:border-primary/40 hover:bg-accent inline-flex h-12 items-center rounded-xl border px-6 text-base font-medium backdrop-blur transition-all hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
            <span aria-hidden="true" className="bg-border mx-1 hidden h-6 w-px sm:block" />
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-accent inline-flex size-12 items-center justify-center rounded-xl border transition-all hover:-translate-y-0.5"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>

          {/* Metrics */}
          <dl
            style={enterDelay(6)}
            className="animate-hero-in border-border mt-12 grid max-w-xl grid-cols-3 gap-4 border-t pt-8"
          >
            {heroMetrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col ${i > 0 ? "border-border border-l pl-4" : ""}`}
              >
                <dt className="text-muted-foreground order-2 mt-1 text-xs leading-snug sm:text-sm">
                  {metric.label}
                </dt>
                <dd className="font-heading order-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                  <span className="sr-only">
                    {metric.value}
                    {metric.suffix}
                  </span>
                  {typeof metric.value === "number" ? (
                    <span
                      aria-hidden="true"
                      className="count-up"
                      style={
                        {
                          "--count-to": metric.value,
                          animationDelay: `${700 + i * 150}ms`,
                        } as CSSProperties
                      }
                    />
                  ) : (
                    <span aria-hidden="true" className="text-gradient-brand inline-flex">
                      {[...metric.value].map((char, c) => (
                        <span
                          key={c}
                          className="hero-letter"
                          style={{ animationDelay: `${900 + i * 150 + c * 110}ms` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  )}
                  <span aria-hidden="true" className="text-gradient-brand">
                    {metric.suffix}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Parallax-fades on scroll via the CSS `.hero-parallax` scroll timeline. */}
        <div className="hero-parallax relative mx-auto w-full max-w-md lg:max-w-[30rem]">
          <div
            aria-hidden="true"
            className="bg-gradient-brand absolute inset-[10%] -z-10 rounded-full opacity-25 blur-3xl"
          />
          <div ref={tiltRef} className="hero-tilt w-full">
            <HeroGraphic />
          </div>
        </div>
      </div>

      <div
        style={{ animationDelay: "1.2s" }}
        className="animate-hero-in text-muted-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs sm:flex"
      >
        <span>Scroll</span>
        <ArrowDown className="animate-nudge size-4" aria-hidden="true" />
      </div>
    </section>
  );
}
