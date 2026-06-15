"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvironmentalLayer } from "@/components/env/EnvironmentalLayer";
import { HeroLetterGame } from "@/components/game/HeroLetterGame/HeroLetterGame";
import { LetterExplorer } from "@/components/game/LetterExplorer";
import { LinkButton } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";
import { fadeUp, reducedMotionVariants, staggerContainer } from "@/lib/animations/framerVariants";

/**
 * Fullscreen hero. Sky-gradient background, ambient EnvironmentalLayer,
 * and the interactive letter-catching canvas game layered on top.
 * Headline + subtitle + CTAs sit above the game layer (pointer-events
 * disabled on text so the canvas remains the primary interactive surface,
 * except for the CTA buttons themselves which re-enable pointer events).
 *
 * Under prefers-reduced-motion, the canvas game is replaced by the
 * accessible LetterExplorer grid.
 */
export function Hero() {
  const reduced = useReducedMotion();
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

      {/* Headline + subtitle + CTAs — non-interactive container, children opt back in */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={reduced ? reducedMotionVariants : staggerContainer}
        className="absolute top-20 sm:top-24 left-0 right-0 z-10 text-center px-6 pointer-events-none"
      >
        <motion.p
          variants={reduced ? reducedMotionVariants : fadeUp}
          className="font-gurmukhi-locked text-2xl sm:text-3xl text-terracotta mb-2"
        >
          ਅੱਜੋ ਖੇਡੀਏ
        </motion.p>
        <motion.h1
          variants={reduced ? reducedMotionVariants : fadeUp}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-ink drop-shadow-sm leading-tight"
        >
          Step into the village
        </motion.h1>
        <motion.p
          variants={reduced ? reducedMotionVariants : fadeUp}
          className="mt-3 font-display text-base sm:text-xl text-ink-soft max-w-xl mx-auto"
        >
          Catch falling Punjabi letters, meet Uda Singh and friends, and grow
          up in a living storybook.
        </motion.p>

        <motion.div
          variants={reduced ? reducedMotionVariants : fadeUp}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
        >
          <LinkButton href="/characters" variant="primary" size="md">
            Meet the Characters
          </LinkButton>
          <LinkButton href="/stories" variant="secondary" size="md">
            Explore Stories
          </LinkButton>
        </motion.div>
      </motion.div>

      {/* Interactive layer */}
      {useExplorer ? (
        <div className="relative z-10 pt-44 sm:pt-56">
          <LetterExplorer />
        </div>
      ) : (
        <HeroLetterGame />
      )}

      {/* Accessibility toggle */}
      {!reduced && (
        <button
          onClick={() => setForceExplorer((v) => !v)}
          className="absolute bottom-4 left-4 z-20 font-display text-xs px-3 py-2 rounded-[var(--radius-toy-pill)] bg-paper/80 backdrop-blur shadow-[var(--shadow-toy-sm)] text-ink-soft hover:text-ink transition-colors"
        >
          {forceExplorer ? "Switch to game mode" : "Switch to letter grid"}
        </button>
      )}

      {/* Scroll-down indicator */}
      {!useExplorer && (
        <motion.div
          className="absolute bottom-6 right-4 sm:right-8 z-10 flex flex-col items-center gap-1 text-ink-soft pointer-events-none"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="font-display text-xs">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 7L10 13L16 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </section>
  );
}
