"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Character } from "@/data/characters";
import { fadeUp, toyPop } from "@/lib/animations/framerVariants";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";
import { reducedMotionVariants } from "@/lib/animations/framerVariants";

interface CharacterHeroProps {
  character: Character;
}

/**
 * Top-of-page hero for an individual character: portrait (if locked),
 * name (Latin + Gurmukhi, locked), tagline, cast badge, and an
 * accent-tinted gradient backdrop derived from the character's bible palette.
 */
export function CharacterHero({ character }: CharacterHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${character.colorPalette[2] ?? "#FBF3E4"} 0%, var(--color-cream) 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
        {character.portraitImage && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reduced ? reducedMotionVariants : toyPop}
            className="mx-auto mb-4 w-40 sm:w-48"
          >
            <Image
              src={character.portraitImage}
              alt={`${character.name} portrait`}
              width={264}
              height={395}
              className="w-full h-auto drop-shadow-[0_8px_24px_rgba(139,94,60,0.18)]"
              priority
            />
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={reduced ? reducedMotionVariants : fadeUp}
        >
          <span
            className="inline-block font-display text-xs font-semibold px-3 py-1 rounded-[var(--radius-toy-pill)] mb-4"
            style={{
              backgroundColor: `${character.accentColor}1f`,
              color: character.accentColor,
            }}
          >
            Cast #{String(character.castNumber).padStart(2, "0")} ·{" "}
            {chapterLabel(character.chapter)}
          </span>

          <p className="font-gurmukhi-locked text-2xl sm:text-3xl text-terracotta mb-2">
            {character.nameGurmukhi}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-ink">
            {character.name}
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl mx-auto">{character.tagline}</p>
          <p className="mt-2 text-sm text-ink-soft/80">{character.ageGender}</p>
        </motion.div>
      </div>
    </section>
  );
}

function chapterLabel(chapter: Character["chapter"]): string {
  switch (chapter) {
    case "family":
      return "The Family";
    case "friends":
      return "The Friends";
    case "animals":
      return "The Animals";
  }
}
