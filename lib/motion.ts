import type { Variants } from "framer-motion";

export const motionTimings = {
  fast: 0.18,
  base: 0.28,
  slow: 0.44,
};

export const motionEase = {
  standard: [0.22, 1, 0.36, 1],
  soft: [0.16, 1, 0.3, 1],
} as const;

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTimings.slow,
      ease: motionEase.soft,
    },
  },
};

export const sectionReveal: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTimings.slow,
      ease: motionEase.soft,
    },
  },
};

export const mediaHover = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: motionTimings.base,
      ease: motionEase.standard,
    },
  },
};
