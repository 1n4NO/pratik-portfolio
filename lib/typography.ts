/**
 * Typography & spatial tokens — single source of truth for class composition.
 * Pair with tailwind.config.ts fluid fontSize and globals.css utilities.
 */

export const type = {
  hero: "font-display text-hero tracking-display",
  sectionTitle: "font-display text-section-title tracking-display",
  subsection: "font-display text-subsection tracking-display-tight",
  standfirst: "text-standfirst leading-standfirst text-ink-soft",
  body: "text-body leading-body",
  caption: "font-mono text-caption uppercase tracking-caps text-ink-soft/70",
  micro: "font-mono text-micro uppercase tracking-caps text-ink-soft/60",
} as const;

export const space = {
  section: "py-section-sm md:py-section-md lg:py-section-lg",
  sectionTight: "py-section-sm md:py-section-md",
  sectionInset: "px-gutter",
} as const;

export const layout = {
  editorialGrid: "editorial-grid",
  editorialGridWide: "editorial-grid editorial-grid--wide",
  blueprint: "blueprint-surface",
} as const;
