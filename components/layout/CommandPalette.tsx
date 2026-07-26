"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Mail, Search, Sparkles, UserRound, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { motionEase, motionTimings } from "@/lib/motion";

type CommandKind = "page" | "project" | "post" | "action";

type CommandItem = {
  id: string;
  title: string;
  eyebrow: string;
  detail: string;
  href: string;
  kind: CommandKind;
  external?: boolean;
};

const baseCommands: CommandItem[] = [
  {
    id: "home",
    title: "Home",
    eyebrow: "Page",
    detail: "Return to the portfolio overview",
    href: "/",
    kind: "page",
  },
  {
    id: "work",
    title: "Work",
    eyebrow: "Page",
    detail: "Browse all case studies",
    href: "/work",
    kind: "page",
  },
  {
    id: "expertise",
    title: "Expertise",
    eyebrow: "Page",
    detail: "Review skills, leadership, and technical focus",
    href: "/expertise",
    kind: "page",
  },
  {
    id: "musings",
    title: "Musings",
    eyebrow: "Page",
    detail: "Read architecture and engineering notes",
    href: "/musings",
    kind: "page",
  },
  {
    id: "contact",
    title: "Contact",
    eyebrow: "Page",
    detail: "Open the contact page",
    href: "/contact",
    kind: "page",
  },
  {
    id: "resume",
    title: "Resume",
    eyebrow: "Action",
    detail: "Open the latest PDF resume",
    href: profile.resumeUrl,
    kind: "action",
    external: true,
  },
  {
    id: "email",
    title: "Email Pratik",
    eyebrow: "Action",
    detail: profile.email,
    href: `mailto:${profile.email}`,
    kind: "action",
    external: true,
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const shortcutLabel = getShortcutLabel();

  const commands = useMemo<CommandItem[]>(
    () => [
      ...baseCommands,
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        title: project.name,
        eyebrow: "Case study",
        detail: project.impact,
        href: `/work/${project.slug}`,
        kind: "project" as const,
      })),
      ...posts.map((post) => ({
        id: `post-${post.slug}`,
        title: post.title,
        eyebrow: post.tag ?? "Musing",
        detail: post.excerpt,
        href: `/musings/${post.slug}`,
        kind: "post" as const,
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return commands;

    return commands.filter((command) =>
      normalize(`${command.title} ${command.eyebrow} ${command.detail}`).includes(normalizedQuery)
    );
  }, [commands, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (!typing && event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runCommand(command: CommandItem) {
    setOpen(false);

    if (command.external) {
      window.location.href = command.href;
      return;
    }

    router.push(command.href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, filtered.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-palette-trigger inline-flex h-9 items-center gap-2 rounded border border-line bg-surface-muted px-2.5 font-mono text-[11px] text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-ring"
        aria-label="Open command palette"
      >
        <Search size={14} aria-hidden />
        <kbd className="hidden text-[10px] text-ink-soft/70 sm:inline">{shortcutLabel}</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-[#05080d]/55 px-4 pt-20 backdrop-blur-sm md:pt-28"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: motionTimings.fast, ease: motionEase.standard }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-lg border border-line bg-paper shadow-[0_28px_90px_rgb(0_0_0_/_0.38)]"
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: motionTimings.base, ease: motionEase.soft }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <Search size={16} className="text-amber" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search projects, notes, pages..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/55"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded text-ink-soft hover:bg-surface-muted hover:text-ink focus-ring"
                  aria-label="Close command palette"
                >
                  <X size={15} aria-hidden />
                </button>
              </div>

              <div className="max-h-[min(65vh,520px)] overflow-y-auto p-2">
                {filtered.length > 0 ? (
                  <ul className="space-y-1">
                    {filtered.map((command, index) => {
                      const active = index === activeIndex;
                      const Icon = getCommandIcon(command.kind);

                      return (
                        <li key={command.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => runCommand(command)}
                            className={`flex w-full items-start gap-3 rounded px-3 py-3 text-left transition-colors focus-ring ${
                              active ? "bg-surface-muted text-ink" : "text-ink-soft hover:bg-surface-muted/70 hover:text-ink"
                            }`}
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-line bg-surface text-amber">
                              <Icon size={15} aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-ink-soft/65">
                                {command.eyebrow}
                              </span>
                              <span className="block truncate font-display text-base font-bold text-ink">
                                {command.title}
                              </span>
                              <span className="mt-1 line-clamp-2 block text-sm leading-snug text-ink-soft">
                                {command.detail}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <p className="font-display text-base font-bold text-ink">No matches</p>
                    <p className="mt-1 text-sm text-ink-soft">Try a project, topic, or page name.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getShortcutLabel() {
  if (typeof navigator === "undefined") return "Ctrl K";
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? "⌘K" : "Ctrl K";
}

function getCommandIcon(kind: CommandKind) {
  if (kind === "project") return Sparkles;
  if (kind === "post") return FileText;
  if (kind === "action") return Mail;
  return UserRound;
}
