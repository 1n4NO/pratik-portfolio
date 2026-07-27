import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { AutoHideHeader } from "@/components/layout/AutoHideHeader";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <AutoHideHeader>
      <Container className="flex items-center justify-between h-16 gap-6">
        <Link
          href="/"
          className="font-display text-sm font-medium tracking-tight focus-ring rounded"
        >
          Pratik Singh
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <HeaderNav />
          <a
            href={`mailto:${profile.email}?subject=Portfolio%20conversation%20from%20your%20website`}
            className="hidden h-9 w-9 items-center justify-center rounded border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-ring md:inline-flex"
            aria-label="Email Pratik"
          >
            <Mail size={15} className="icon-amber" aria-hidden="true" />
          </a>
          <div className="mobile-header-actions flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </AutoHideHeader>
  );
}
