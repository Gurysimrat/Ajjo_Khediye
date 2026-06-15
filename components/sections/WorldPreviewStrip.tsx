"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { characters } from "@/data/characters";
import { staggerContainer, toyPop } from "@/lib/animations/framerVariants";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

// A curated set spanning Family, Friends, and Animals for the homepage teaser.
const previewSlugs = [
  "uda-singh",
  "edi-kaur",
  "paalo",
  "fateh-singh",
  "daadi-ji",
  "gittu",
  "hoot-singh",
  "lallu",
];

const previewCharacters = previewSlugs
  .map((slug) => characters.find((c) => c.slug === slug))
  .filter(Boolean);

/**
 * Horizontally-scrollable strip introducing the cast of Ajjo Khediye.
 * Native scroll with snap points — performant, touch-friendly, and
 * accessible (each card is a focusable link).
 */
export function WorldPreviewStrip() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-gurmukhi-locked text-lg text-terracotta mb-1">ਪਿੰਡ ਦੇ ਲੋਕ</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Faces of the village
            </h2>
          </div>
          <Link
            href="/characters"
            className="font-display text-sm font-semibold text-terracotta hover:text-marigold transition-colors"
          >
            Meet everyone →
          </Link>
        </div>
      </RevealOnScroll>

      <motion.div
        className="flex gap-5 px-6 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {previewCharacters.map((character) => (
          <motion.div key={character!.slug} variants={toyPop} className="snap-start shrink-0">
            <Link
              href={`/characters/${character!.slug}`}
              className="group block w-40 sm:w-48 rounded-[var(--radius-toy-lg)] bg-paper shadow-[var(--shadow-toy-md)] hover:shadow-[var(--shadow-toy-lg)] transition-shadow overflow-hidden"
            >
              <div
                className="h-28 sm:h-32 flex items-center justify-center text-5xl"
                style={{ backgroundColor: `${character!.accentColor}1f` }}
                aria-hidden="true"
              >
                {character!.portraitImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={character!.portraitImage}
                    alt=""
                    className="h-full w-full object-contain p-3"
                  />
                ) : (
                  <span style={{ color: character!.accentColor }}>
                    {character!.nameGurmukhi.charAt(0)}
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <p className="font-display text-sm sm:text-base font-bold text-ink group-hover:text-terracotta transition-colors">
                  {character!.name}
                </p>
                <p className="font-gurmukhi-locked text-xs text-ink-soft mt-0.5">
                  {character!.nameGurmukhi}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Trailing spacer so last card isn't flush against edge */}
        <div className="shrink-0 w-1" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
