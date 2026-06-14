"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/state/gameStore";
import { Badge } from "@/components/ui/Badge";

/**
 * Top-left HUD showing current XP and combo streak.
 * Combo badge pulses subtly when the streak increases.
 */
export function ComboMeter() {
  const xp = useGameStore((s) => s.xp);
  const combo = useGameStore((s) => s.combo);

  return (
    <div className="absolute top-24 left-4 sm:left-6 flex flex-col gap-2 z-10" aria-live="polite">
      <Badge tone="marigold" className="text-base px-4 py-1.5 shadow-[var(--shadow-toy-sm)]">
        ✨ {xp} XP
      </Badge>
      {combo > 1 && (
        <motion.div
          key={combo}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Badge tone="leaf" className="text-base px-4 py-1.5 shadow-[var(--shadow-toy-sm)]">
            🔥 Combo x{combo}
          </Badge>
        </motion.div>
      )}
    </div>
  );
}
