import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

import { CommandPaletteLoader } from "@/components/command-palette/command-palette-loader";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { identity, summary, tagline } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${identity.name} — ${identity.title}`,
    template: `%s — ${identity.name}`,
  },
  description: tagline,
  keywords: [
    "Sunil Gautam",
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Architecture",
  ],
  authors: [{ name: identity.name, url: siteConfig.url }],
  creator: identity.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${identity.name} — ${identity.title}`,
    description: tagline,
    siteName: identity.name,
    images: [{ url: "/og", width: 1200, height: 630, alt: identity.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.title}`,
    description: tagline,
    images: ["/og"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: identity.title,
  description: summary,
  email: `mailto:${identity.email}`,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: identity.location,
  },
  sameAs: [identity.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={200}>
            <AmbientBackground />
            <SmoothScrollProvider>
              <SkipLink />
              <Nav />
              <main id="main-content">{children}</main>
              <Footer />
            </SmoothScrollProvider>
            <Toaster />
            <CommandPaletteLoader />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
