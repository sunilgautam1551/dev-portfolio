import { Download, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { Button } from "@/components/ui/button";
import { education, experience, identity, projects, skillGroups, summary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${identity.name}, ${identity.title}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {identity.name}
          </h1>
          <p className="text-primary mt-1 text-lg font-medium">{identity.title}</p>

          <div className="text-muted-foreground mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden="true" />
              {identity.location}
            </span>
            <a
              href={`mailto:${identity.email}`}
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <Mail className="size-4" aria-hidden="true" />
              {identity.email}
            </a>
            <a
              href={`tel:${identity.phone.replace(/\s+/g, "")}`}
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <Phone className="size-4" aria-hidden="true" />
              {identity.phone}
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <LinkedinIcon className="size-4" aria-hidden="true" />
              {identity.linkedinHandle}
            </a>
          </div>
        </div>

        <Button asChild>
          <Link href="/resume.pdf" download>
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </Link>
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Summary</h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">{summary}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Experience</h2>
        <div className="mt-4 space-y-10">
          {experience.map((entry) => (
            <div key={entry.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {entry.role} · {entry.company}
                </h3>
                <p className="text-muted-foreground font-mono text-sm">{entry.period}</p>
              </div>
              <p className="text-muted-foreground text-sm">{entry.location}</p>
              <ul className="mt-3 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-primary mt-2 size-1 shrink-0 rounded-full bg-current" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-3 text-xs">
                <span className="font-medium">Tech stack: </span>
                {entry.stack.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Projects</h2>
        <div className="mt-4 space-y-10">
          {projects.map((project) => (
            <div key={project.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-muted-foreground font-mono text-sm">{project.org}</p>
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {project.description}
              </p>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-primary mt-2 size-1 shrink-0 rounded-full bg-current" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Skills</h2>
        <dl className="mt-4 space-y-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="text-muted-foreground w-full shrink-0 text-sm sm:w-56">
                {group.category}
              </dt>
              <dd className="text-sm">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Education</h2>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-sm">
            {education.degree} · {education.school}
          </p>
          <p className="text-muted-foreground font-mono text-sm">{education.period}</p>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">CGPA: {education.cgpa}</p>
      </section>
    </div>
  );
}
