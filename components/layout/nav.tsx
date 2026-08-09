"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toggleCommandPalette } from "@/lib/command-palette-events";
import { navSections } from "@/lib/content";

import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Highlights the nav item for whichever section is crossing the vertical
  // center of the viewport. No-ops gracefully on pages without these ids
  // (e.g. /resume, /admin/guestbook).
  useEffect(() => {
    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 border-border border-b backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/#top"
          className="font-heading focus-visible:outline-ring text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Sunil Gautam
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="bg-accent absolute inset-0 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Link
                  href={`/#${section.id}`}
                  className={`focus-visible:outline-ring relative z-10 block rounded-md px-3.5 py-2.5 text-[0.95rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            onClick={toggleCommandPalette}
            aria-label="Open command palette"
            className="text-muted-foreground gap-2 px-3"
          >
            <Command className="size-4" aria-hidden="true" />
            <kbd className="font-mono text-sm">K</kbd>
          </Button>
          <ThemeToggle />
          <Button asChild>
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-background border-border overflow-hidden border-b lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navSections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/#${section.id}`}
                    onClick={() => setOpen(false)}
                    className="text-foreground block rounded-md px-2 py-3 text-base font-medium"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
