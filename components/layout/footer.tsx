import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { identity, navSections, tagline } from "@/lib/content";

const connectLinks = [
  { label: "Email", href: `mailto:${identity.email}`, icon: Mail, external: false },
  { label: "GitHub", href: identity.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: identity.linkedin, icon: LinkedinIcon, external: true },
];

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/#top"
              className="font-heading focus-visible:outline-ring text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {identity.name}
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-base leading-relaxed">
              {tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground focus-visible:outline-ring flex size-11 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <link.icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-foreground text-sm font-semibold tracking-wide uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {navSections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/#${section.id}`}
                    className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-foreground text-sm font-semibold tracking-wide uppercase">More</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/resume"
                  className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Resume
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {identity.email}
                </a>
              </li>
              <li className="text-muted-foreground text-base">{identity.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {identity.name}. Built with Next.js.
          </p>
          <Link
            href="/#top"
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
