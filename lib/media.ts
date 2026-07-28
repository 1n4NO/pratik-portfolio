export type MediaTheme = "all" | "light" | "dark";

export function matchesMediaTheme(src: string, theme: MediaTheme) {
  if (theme === "all") return true;
  if (!hasThemeToken(src)) return true;
  return theme === "light" ? isLightModeMedia(src) : isDarkModeMedia(src);
}

export function getThemedMediaSrc(src: string, theme: Exclude<MediaTheme, "all">) {
  if (!hasThemeToken(src)) return src;
  return src.replace(/(^|[-_/])(light|dark)(?=[-_.]|$)/i, (_match, prefix: string) => {
    return `${prefix}${theme}`;
  });
}

export function hasMediaThemePair(src: string, candidateSources: string[]) {
  if (!hasThemeToken(src)) return false;

  const oppositeTheme = isDarkModeMedia(src) ? "light" : "dark";
  const pairSrc = getThemedMediaSrc(src, oppositeTheme);
  return candidateSources.includes(pairSrc);
}

export function isDarkModeMedia(src: string) {
  return /(?:^|[-_/])dark(?=[-_.]|$)/i.test(src);
}

export function isLightModeMedia(src: string) {
  return /(?:^|[-_/])light(?=[-_.]|$)/i.test(src);
}

function hasThemeToken(src: string) {
  return /(?:^|[-_/])(light|dark)(?=[-_.]|$)/i.test(src);
}
