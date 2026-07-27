import type { Variants, Transition } from "framer-motion";

export const motionTimings = {
  fast: 0.18,
  base: 0.28,
  slow: 0.44,
};

export const motionEase = {
  standard: [0.22, 1, 0.36, 1],
  soft: [0.16, 1, 0.3, 1],
} as const;

// Physical, spring-driven transitions — real mass/stiffness/damping instead of
// an eased tween, for a tactile feel rather than a smoothed-out glide.
export const motionSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 26,
  mass: 0.9,
};

export const motionSpringSoft: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 1,
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: motionSpringSoft,
  },
};

export const sectionReveal: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: motionSpringSoft,
  },
};

export const mediaHover = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -5,
    scale: 1.015,
    transition: motionSpring,
  },
};
