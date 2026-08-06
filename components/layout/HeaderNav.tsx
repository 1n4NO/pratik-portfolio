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
      <ul className="flex items-center gap-4 md:gap-7">
        {navItems.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href} className={index === 0 ? "block" : "hidden sm:block"}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`header-link font-sans text-sm focus-ring ${
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
