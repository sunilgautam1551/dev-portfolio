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
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/#top"
          className="font-heading focus-visible:outline-ring text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Sunil Gautam
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-ring rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCommandPalette}
            aria-label="Open command palette"
            className="text-muted-foreground gap-1.5"
          >
            <Command className="size-3.5" aria-hidden="true" />
            <kbd className="font-mono text-xs">K</kbd>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
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
            className="bg-background border-border overflow-hidden border-b md:hidden"
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
