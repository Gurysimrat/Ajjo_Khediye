"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/state/gameStore";
import { xpFloat, reducedMotionVariants } from "@/lib/animations/framerVariants";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";
import { useEffect } from "react";

/**
 * Renders floating "+XP" labels at the position of each catch.
 * Reads from gameStore.floaters and self-dismisses after the
 * animation completes.
 */
export function XPFloater() {
  const floaters = useGameStore((s) => s.floaters);
  const dismissFloater = useGameStore((s) => s.dismissFloater);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timers = floaters.map((f) =>
      setTimeout(() => dismissFloater(f.id), reduced ? 400 : 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [floaters, dismissFloater, reduced]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {floaters.map((f) => (
          <motion.div
            key={f.id}
            className="absolute font-display font-bold text-marigold text-lg drop-shadow-sm"
            style={{ left: f.x, top: f.y }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={reduced ? reducedMotionVariants : xpFloat}
          >
            +{f.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
