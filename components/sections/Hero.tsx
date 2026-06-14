"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvironmentalLayer } from "@/components/env/EnvironmentalLayer";
import { HeroLetterGame } from "@/components/game/HeroLetterGame/HeroLetterGame";
import { LetterExplorer } from "@/components/game/LetterExplorer";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";
import { fadeUp, reducedMotionVariants } from "@/lib/animations/framerVariants";

/**
 * Fullscreen hero. Sky-gradient background, ambient EnvironmentalLayer,
 * and the interactive letter-catching canvas game layered on top.
 * Headline sits above the game layer (pointer-events disabled on text
 * so the canvas remains the primary interactive surface).
 *
 * Under prefers-reduced-motion, the canvas game is replaced by the
 * accessible LetterExplorer grid.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const [showExplorerToggle] = useState(true);
  const [forceExplorer, setForceExplorer] = useState(false);

  const useExplorer = reduced || forceExplorer;

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-sky) 0%, var(--color-sky-deep) 35%, var(--color-cream) 100%)",
        }}
        aria-hidden="true"
      />

      <EnvironmentalLayer />

      {/* Headline — non-interactive overlay */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={reduced ? reducedMotionVariants : fadeUp}
        className="absolute top-24 sm:top-28 left-0 right-0 z-10 text-center px-6 pointer-events-none"
      >
        <p className="font-gurmukhi-locked text-2xl sm:text-3xl text-terracotta mb-2">
          ਅੱਜੋ ਖੇਡੀਏ
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-ink drop-shadow-sm">
          Catch the letters of the village
        </h1>
      </motion.div>

      {/* Interactive layer */}
      {useExplorer ? (
        <div className="relative z-10 pt-40">
          <LetterExplorer />
        </div>
      ) : (
        <HeroLetterGame />
      )}

      {/* Accessibility toggle */}
      {showExplorerToggle && !reduced && (
        <button
          onClick={() => setForceExplorer((v) => !v)}
          className="absolute bottom-4 left-4 z-20 font-display text-xs px-3 py-2 rounded-[var(--radius-toy-pill)] bg-paper/80 backdrop-blur shadow-[var(--shadow-toy-sm)] text-ink-soft hover:text-ink transition-colors"
        >
          {forceExplorer ? "Switch to game mode" : "Switch to letter grid"}
        </button>
      )}
    </section>
  );
}
