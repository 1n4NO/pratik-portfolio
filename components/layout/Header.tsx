import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { AutoHideHeader } from "@/components/layout/AutoHideHeader";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <AutoHideHeader>
      <Container className="grid h-20 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:h-24 md:gap-6">
        <Link
          href="/"
          className="font-display text-xl text-ink focus-ring md:text-2xl"
        >
          1N4N0
        </Link>

        <div className="flex min-w-0">
          <div className="w-full">
            <CommandPalette />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <HeaderNav />
          <a
            href={`mailto:${profile.email}?subject=Portfolio%20conversation`}
            className="hidden items-center gap-2 border-b border-line-strong pb-1 font-sans text-sm text-ink transition-colors hover:border-signal hover:text-signal focus-ring md:inline-flex"
            aria-label="Email Pratik"
          >
            Let&apos;s talk
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </AutoHideHeader>
  );
}
