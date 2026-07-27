const MUSINGS_BACKGROUNDS = [
  "blob-haikei.svg",
  "circle-scatter-haikei.svg",
  "layered-waves-haikei.svg",
  "stacked-waves-haikei.svg",
  "wave-haikei.svg",
] as const;

// Deterministic per-post pick, same hashing approach as lib/tags.ts — a given
// post always gets the same background, and any future post added to
// data/posts.ts gets one automatically without editing this file.
export function getMusingsBackground(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const file = MUSINGS_BACKGROUNDS[hash % MUSINGS_BACKGROUNDS.length];
  return `/projects/Musings/${file}`;
}
