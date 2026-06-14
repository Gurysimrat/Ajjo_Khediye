"use client";

import { motion } from "framer-motion";
import { gurmukhiLetters } from "@/data/letters";
import { useUserStore } from "@/state/userStore";
import { staggerContainer, toyPop } from "@/lib/animations/framerVariants";

/**
 * Non-game alternative to the canvas letter-catcher. Presents the
 * Gurmukhi alphabet as a tappable grid — each tap marks the letter
 * as "learned" (same store as the game), giving an equivalent
 * outcome without requiring motion-based interaction.
 */
export function LetterExplorer() {
  const lettersLearned = useUserStore((s) => s.lettersLearned);
  const markLetterLearned = useUserStore((s) => s.markLetterLearned);

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
      <h2 className="font-display text-2xl font-bold text-center text-ink mb-2">
        Explore the Gurmukhi alphabet
      </h2>
      <p className="text-center text-ink-soft mb-6">
        Tap a letter to add it to your collection.
      </p>
      <motion.div
        className="grid grid-cols-5 sm:grid-cols-7 gap-3"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {gurmukhiLetters.map((letter) => {
          const learned = lettersLearned.includes(letter.char);
          return (
            <motion.button
              key={letter.char}
              variants={toyPop}
              onClick={() => markLetterLearned(letter.char)}
              className={`font-gurmukhi-locked aspect-square rounded-[var(--radius-toy-md)] flex items-center justify-center text-2xl shadow-[var(--shadow-toy-sm)] transition-colors ${
                learned ? "bg-leaf-soft text-ink" : "bg-paper text-ink-soft"
              }`}
              aria-pressed={learned}
              aria-label={`${letter.roman}${learned ? ", learned" : ""}`}
            >
              {letter.char}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
