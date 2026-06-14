"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface BirdProps {
  className?: string;
  scale?: number;
  /** Flight path drift across the screen, in px. */
  flightDistance?: number;
  duration?: number;
  delay?: number;
}

/** A small, simplified bird silhouette with a gentle wing-flap loop. */
export function Bird({
  className,
  scale = 1,
  flightDistance = 40,
  duration = 18,
  delay = 0,
}: BirdProps) {
  const reduced = useReducedMotion();

  const body = (
    <svg width={28 * scale} height={18 * scale} viewBox="0 0 28 18" aria-hidden="true">
      <path
        d="M14 9 C 10 2, 2 2, 0 6 C 6 6, 10 8, 14 9 C 18 8, 22 6, 28 6 C 26 2, 18 2, 14 9 Z"
        fill="var(--color-ink-soft)"
        opacity="0.6"
      />
    </svg>
  );

  if (reduced) {
    return <div className={className}>{body}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        x: [0, flightDistance, flightDistance * 1.6, 0],
        y: [0, -10, 4, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ scaleY: [1, 0.6, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        {body}
      </motion.div>
    </motion.div>
  );
}
