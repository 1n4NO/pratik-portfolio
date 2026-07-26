"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/expertise", label: "Expertise" },
  { href: "/musings", label: "Musings" },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-4 md:gap-8">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`header-link font-mono text-[11px] tracking-widest uppercase focus-ring ${
                  active ? "is-active text-signal" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
