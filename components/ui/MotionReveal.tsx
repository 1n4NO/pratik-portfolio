"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionReveal } from "@/lib/motion";

type MotionRevealProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  "aria-labelledby"?: string;
};

export function MotionReveal({ children, ...props }: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <section {...props}>{children}</section>;
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.18 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
