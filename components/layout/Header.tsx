import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { AutoHideHeader } from "@/components/layout/AutoHideHeader";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <AutoHideHeader>
      <Container className="grid h-16 grid-cols-[auto,minmax(0,1fr),auto] items-center gap-4 md:gap-6">
        <Link
          href="/"
          className="bg-amber px-0 py-0 font-mono text-sm font-medium tracking-tight text-[#1b2030] focus-ring"
        >
          1N4N0
        </Link>

        <div className="flex min-w-0 justify-center px-2">
          <div className="w-full max-w-[38rem]">
            <CommandPalette />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <HeaderNav />
          <a
            href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
            className="hidden h-9 w-9 items-center justify-center rounded border border-line text-amber transition-colors hover:border-line-strong focus-ring md:inline-flex"
            aria-label="Email Pratik"
          >
            <Mail size={15} className="icon-amber" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </AutoHideHeader>
  );
}
