import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-primary font-mono text-sm font-medium">404</span>
      <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-balance">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
