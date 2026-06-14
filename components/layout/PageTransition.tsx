"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

/**
 * Wraps page content in a soft cross-fade/rise transition on route change.
 * Place inside each page's top-level element (App Router doesn't yet
 * support layout-level AnimatePresence without a client boundary).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.45, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
