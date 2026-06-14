"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, reducedMotionVariants } from "@/lib/animations/framerVariants";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
}

/**
 * Wraps content in a scroll-triggered fade/rise reveal.
 * Respects prefers-reduced-motion by falling back to a simple fade.
 */
export function RevealOnScroll({ children, className, delay = 0 }: RevealOnScrollProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={reduced ? reducedMotionVariants : fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
