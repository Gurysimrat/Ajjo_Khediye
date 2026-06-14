"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface KiteProps {
  className?: string;
  scale?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

/** A diamond kite with a phulkari-style accent and tail, swaying gently. */
export function Kite({
  className,
  scale = 1,
  color = "var(--color-marigold)",
  duration = 8,
  delay = 0,
}: KiteProps) {
  const reduced = useReducedMotion();

  const body = (
    <svg width={48 * scale} height={70 * scale} viewBox="0 0 48 70" aria-hidden="true">
      {/* Kite diamond */}
      <polygon points="24,0 48,28 24,40 0,28" fill={color} />
      <polygon points="24,0 24,40 0,28" fill="var(--color-terracotta-soft)" opacity="0.7" />
      {/* Cross spars */}
      <line x1="24" y1="0" x2="24" y2="40" stroke="var(--color-wood)" strokeWidth="1.5" />
      <line x1="0" y1="28" x2="48" y2="28" stroke="var(--color-wood)" strokeWidth="1.5" />
      {/* Tail */}
      <path
        d="M24 40 C 26 48, 20 52, 24 60 C 28 66, 20 68, 24 70"
        stroke="var(--color-leaf)"
        strokeWidth="2"
        fill="none"
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
        y: [0, -14, 0],
        rotate: [-4, 4, -4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
    >
      {body}
    </motion.div>
  );
}
