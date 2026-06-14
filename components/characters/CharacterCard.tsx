"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Character } from "@/data/characters";
import { toyPop } from "@/lib/animations/framerVariants";

interface CharacterCardProps {
  character: Character;
}

/**
 * A "village door" card — tappable portal into a character's page.
 * Accent-colored top edge derived from the character's bible palette.
 */
export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <motion.div variants={toyPop}>
      <Link
        href={`/characters/${character.slug}`}
        className="group block rounded-[var(--radius-toy-lg)] bg-paper shadow-[var(--shadow-toy-md)] overflow-hidden hover:shadow-[var(--shadow-toy-lg)] transition-shadow"
      >
        {/* Accent header */}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: character.accentColor }}
          aria-hidden="true"
        />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-display text-xl font-bold text-ink group-hover:text-terracotta transition-colors">
                {character.name}
              </h3>
              <p className="font-gurmukhi-locked text-sm text-ink-soft mt-0.5">
                {character.nameGurmukhi}
              </p>
            </div>
            <span
              className="shrink-0 font-display text-xs font-semibold px-2.5 py-1 rounded-[var(--radius-toy-pill)]"
              style={{
                backgroundColor: `${character.accentColor}22`,
                color: character.accentColor,
              }}
            >
              #{String(character.castNumber).padStart(2, "0")}
            </span>
          </div>

          <p className="text-sm text-ink-soft line-clamp-3">{character.tagline}</p>

          {/* Palette swatches */}
          <div className="flex gap-1.5 mt-4" aria-hidden="true">
            {character.colorPalette.slice(0, 5).map((hex, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border border-wood-light/30"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
