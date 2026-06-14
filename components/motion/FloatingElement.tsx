"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  /** Horizontal drift distance in px. */
  driftX?: number;
  /** Vertical bob distance in px. */
  driftY?: number;
  /** Full loop duration in seconds. */
  duration?: number;
  /** Stagger/offset start time in seconds. */
  delay?: number;
}

/**
 * Generic ambient-motion wrapper for background elements
 * (birds, clouds, butterflies, kites). Background motion should
 * stay within small translation/scale ranges per motion guidelines.
 * Disabled entirely under prefers-reduced-motion.
 */
export function FloatingElement({
  children,
  className,
  driftX = 12,
  driftY = 8,
  duration = 14,
  delay = 0,
}: FloatingElementProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        x: [0, driftX, 0, -driftX, 0],
        y: [0, -driftY, 0, driftY, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
