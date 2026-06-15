"use client";

import { motion } from "framer-motion";
import type { Story } from "@/data/stories";
import { staggerContainer, toyPop } from "@/lib/animations/framerVariants";

interface ChapterSelectorProps {
  story: Story;
  onSelectChapter: (chapterIndex: number) => void;
}

const chapterIcons = ["🌅", "🧺", "🐐", "🌙"];

/**
 * The "closed book" view — shows the story title and a row of
 * clickable chapter tiles. Selecting a chapter opens the book to
 * its first page.
 */
export function ChapterSelector({ story, onSelectChapter }: ChapterSelectorProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-paper rounded-[var(--radius-toy-lg)]">
      <p className="font-gurmukhi-locked text-lg sm:text-xl text-terracotta mb-2">
        {story.titleGurmukhi}
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">{story.title}</h2>
      <p className="text-ink-soft text-sm sm:text-base max-w-md mb-6">{story.description}</p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {story.chapters.map((chapter, index) => (
          <motion.button
            key={chapter.id}
            variants={toyPop}
            onClick={() => onSelectChapter(index)}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-toy-md)] bg-cream-deep hover:bg-marigold-soft transition-colors p-4 shadow-[var(--shadow-toy-sm)]"
          >
            <span className="text-3xl" aria-hidden="true">
              {chapterIcons[index % chapterIcons.length]}
            </span>
            <span className="font-display text-xs font-semibold text-ink-soft uppercase tracking-wide">
              Chapter {index + 1}
            </span>
            <span className="font-display text-sm font-bold text-ink leading-tight">
              {chapter.title}
            </span>
            {chapter.titleGurmukhi && (
              <span className="font-gurmukhi-locked text-xs text-terracotta">
                {chapter.titleGurmukhi}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
