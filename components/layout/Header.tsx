import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { AutoHideHeader } from "@/components/layout/AutoHideHeader";

export function Header() {
  return (
    <AutoHideHeader>
      <Container className="flex items-center justify-between h-16 gap-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight focus-ring rounded"
        >
          [PS]
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <HeaderNav />
          <ThemeToggle />
        </div>
      </Container>
    </AutoHideHeader>
  );
}
