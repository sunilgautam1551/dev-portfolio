import { Mail } from "lucide-react";
import Link from "next/link";

import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { identity } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {identity.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={`mailto:${identity.email}`}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email
          </Link>
          <Link
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
            LinkedIn
          </Link>
          <Link
            href="/resume"
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
