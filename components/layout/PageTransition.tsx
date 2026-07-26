"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransition } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <motion.main
      key={pathname}
      className="flex-1"
      variants={pageTransition}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.main>
  );
}
