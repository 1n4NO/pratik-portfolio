import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "1px",
      },
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-strong": "rgb(var(--color-line-strong) / <alpha-value>)",
        signal: "rgb(var(--color-signal) / <alpha-value>)",
        "signal-dark": "rgb(var(--color-signal-dark) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        "amber-bg": "rgb(var(--color-amber-bg) / <alpha-value>)",
        deep: "rgb(var(--color-deep) / <alpha-value>)",
        "deep-line": "rgb(var(--color-deep-line) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 4vw + 1.5rem, 6rem)",
          { lineHeight: "1.04", letterSpacing: "-0.035em", fontWeight: "500" },
        ],
        "section-title": [
          "clamp(1.875rem, 2.5vw + 0.75rem, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "500" },
        ],
        subsection: [
          "clamp(1.375rem, 1.5vw + 0.75rem, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "500" },
        ],
        standfirst: [
          "clamp(1.125rem, 1vw + 0.75rem, 1.5rem)",
          { lineHeight: "1.65" },
        ],
        body: [
          "clamp(1rem, 0.25vw + 0.9375rem, 1.0625rem)",
          { lineHeight: "1.7" },
        ],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
        micro: ["0.6875rem", { lineHeight: "1.35" }],
      },
      letterSpacing: {
        display: "-0.035em",
        "display-tight": "-0.025em",
        caps: "0.12em",
        "caps-wide": "0.18em",
      },
      lineHeight: {
        standfirst: "1.65",
        body: "1.7",
      },
      spacing: {
        gutter: "clamp(1.25rem, 3vw, 2.75rem)",
        "section-sm": "clamp(4.5rem, 8vw, 6rem)",
        "section-md": "clamp(6rem, 10vw, 8rem)",
        "section-lg": "clamp(7rem, 12vw, 9rem)",
        "grid-gap": "clamp(2rem, 4vw, 4rem)",
      },
      maxWidth: {
        content: "1240px",
        prose: "42rem",
        "prose-wide": "52rem",
      },
      backgroundImage: {
        grid: "linear-gradient(var(--tw-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--tw-grid-line) 1px, transparent 1px)",
        blueprint: "linear-gradient(rgb(var(--tw-grid-line) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--tw-grid-line) / 0.35) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
        blueprint: "48px 48px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
