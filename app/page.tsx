import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { CaseStudies } from "@/components/sections/case-studies";
import { Engineering } from "@/components/sections/engineering";
import { Experience } from "@/components/sections/experience";
import { GuestbookSection } from "@/components/sections/guestbook-section";
import { Hero } from "@/components/sections/hero";
import { ImpactStats } from "@/components/sections/impact-stats";
import { Skills } from "@/components/sections/skills";
import { Skeleton } from "@/components/ui/skeleton";

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section").then((m) => m.ContactSection),
  {
    loading: () => (
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    ),
  },
);

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <About />
      <Engineering />
      <CaseStudies />
      <Skills />
      <Experience />
      <Achievements />
      <GuestbookSection />
      <ContactSection />
    </>
  );
}
