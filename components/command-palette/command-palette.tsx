"use client";

import { Copy, Download, FileText, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { TOGGLE_COMMAND_PALETTE_EVENT } from "@/lib/command-palette-events";
import { identity, navSections } from "@/lib/content";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);

    function onToggle() {
      setOpen((v) => !v);
    }
    window.addEventListener(TOGGLE_COMMAND_PALETTE_EVENT, onToggle);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(TOGGLE_COMMAND_PALETTE_EVENT, onToggle);
    };
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => router.push("/#top"))}>
            <Home />
            Home
          </CommandItem>
          {navSections.map((section) => (
            <CommandItem
              key={section.id}
              onSelect={() => run(() => router.push(`/#${section.id}`))}
            >
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            Toggle theme
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                navigator.clipboard.writeText(identity.email);
                toast.success("Email copied to clipboard");
              })
            }
          >
            <Copy />
            Copy email
            <CommandShortcut>{identity.email}</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/resume"))}>
            <FileText />
            View resume
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open("/resume.pdf", "_blank"))}>
            <Download />
            Download resume (PDF)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
