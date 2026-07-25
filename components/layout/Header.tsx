import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/expertise", label: "Expertise" },
  { href: "/musings", label: "Musings" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between h-16 gap-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight focus-ring rounded"
        >
          [PS]
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 md:gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="header-link font-mono text-[11px] tracking-widest uppercase text-ink-soft focus-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
