// A small, deliberately limited palette for tinting content by category
// (currently: musing tags). Reuses the site's existing accent tokens
// (signal, amber) plus two purpose-built additions (violet, teal) rather
// than growing an unbounded set of one-off colors — same discipline as the
// rest of the design system's CSS variables in globals.css.
const TAG_COLOR_VARS = [
  "--color-signal",
  "--color-amber",
  "--color-tag-violet",
  "--color-tag-teal",
] as const;

// Deterministic hash so a given tag always lands on the same color, and any
// new tag added later gets one automatically without editing this file.
export function getTagColorVar(tag?: string): string {
  if (!tag) return "--color-ink-soft";
  let hash = 0;
  for (let i = 0; i < tag.length; i += 1) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return TAG_COLOR_VARS[hash % TAG_COLOR_VARS.length];
}

export function tagColorStyle(tag: string | undefined, alpha = 1) {
  const varName = getTagColorVar(tag);
  return `rgb(var(${varName}) / ${alpha})`;
}
