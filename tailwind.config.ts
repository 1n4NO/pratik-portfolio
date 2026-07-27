import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "2px",
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
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(var(--tw-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--tw-grid-line) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
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
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
