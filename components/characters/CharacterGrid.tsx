"use client";

import { motion } from "framer-motion";
import { getCharactersByChapter, chapterMeta, type CharacterChapter } from "@/data/characters";
import { CharacterCard } from "./CharacterCard";
import { staggerContainer } from "@/lib/animations/framerVariants";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const chapterOrder: CharacterChapter[] = ["family", "friends", "animals"];

/**
 * Full character roster grouped into the three chapters from the
 * character bible: The Family, The Friends, The Animals.
 */
export function CharacterGrid() {
  return (
    <div className="space-y-16">
      {chapterOrder.map((chapter) => {
        const meta = chapterMeta[chapter];
        const chars = getCharactersByChapter(chapter);

        return (
          <section key={chapter}>
            <RevealOnScroll>
              <div className="mb-6 text-center">
                <p className="font-gurmukhi-locked text-lg text-terracotta mb-1">
                  {meta.titleGurmukhi}
                </p>
                <h2 className="font-display text-3xl font-bold text-ink">{meta.title}</h2>
              </div>
            </RevealOnScroll>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {chars.map((character) => (
                <CharacterCard key={character.slug} character={character} />
              ))}
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
