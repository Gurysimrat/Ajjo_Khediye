"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface ButterflyProps {
  className?: string;
  scale?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

/** A felt-textured butterfly that flutters and drifts in a loose loop. */
export function Butterfly({
  className,
  scale = 1,
  color = "var(--color-terracotta-soft)",
  duration = 10,
  delay = 0,
}: ButterflyProps) {
  const reduced = useReducedMotion();

  const wings = (
    <svg width={24 * scale} height={20 * scale} viewBox="0 0 24 20" aria-hidden="true">
      <ellipse cx="8" cy="7" rx="7" ry="6" fill={color} />
      <ellipse cx="16" cy="7" rx="7" ry="6" fill={color} />
      <ellipse cx="8" cy="14" rx="5" ry="4.5" fill="var(--color-marigold-soft)" />
      <ellipse cx="16" cy="14" rx="5" ry="4.5" fill="var(--color-marigold-soft)" />
      <rect x="11" y="4" width="2" height="13" rx="1" fill="var(--color-ink-soft)" />
    </svg>
  );

  if (reduced) {
    return <div className={className}>{wings}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 18, -10, 14, 0],
        y: [0, -16, -4, -22, 0],
        rotate: [0, 8, -6, 4, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ scaleX: [1, 0.7, 1] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      >
        {wings}
      </motion.div>
    </motion.div>
  );
}
