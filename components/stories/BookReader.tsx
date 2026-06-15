"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Story } from "@/data/stories";
import { ChapterSelector } from "./ChapterSelector";
import { BookPage } from "./BookPage";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

interface BookReaderProps {
  story: Story;
}

type ViewState = { mode: "cover" } | { mode: "reading"; chapterIndex: number; spreadIndex: number };

const spreadVariants: Variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.45, 0, 0.2, 1] },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.45, 0, 0.2, 1] },
  }),
};

const reducedVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * Interactive open-book story reader.
 *
 * - Cover/closed state shows a chapter selector (ChapterSelector).
 * - Selecting a chapter "opens" the book to a two-page spread.
 * - Bottom-center prev/next controls flip between spreads with a
 *   3D page-turn animation (disabled under prefers-reduced-motion).
 * - Top-left back button returns to the chapter selector.
 * - Reaching the end of the last chapter's pages returns to cover.
 */
export function BookReader({ story }: BookReaderProps) {
  const [view, setView] = useState<ViewState>({ mode: "cover" });
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();

  const chapter = view.mode === "reading" ? story.chapters[view.chapterIndex] : null;

  // Group chapter pages into spreads of 2.
  const spreads = useMemo(() => {
    if (!chapter) return [];
    const result: (typeof chapter.pages)[] = [];
    for (let i = 0; i < chapter.pages.length; i += 2) {
      result.push(chapter.pages.slice(i, i + 2));
    }
    return result;
  }, [chapter]);

  const currentSpread = view.mode === "reading" ? spreads[view.spreadIndex] : null;

  const goToCover = () => setView({ mode: "cover" });

  const selectChapter = (chapterIndex: number) => {
    setDirection(1);
    setView({ mode: "reading", chapterIndex, spreadIndex: 0 });
  };

  const nextSpread = () => {
    if (view.mode !== "reading") return;
    if (view.spreadIndex + 1 < spreads.length) {
      setDirection(1);
      setView({ ...view, spreadIndex: view.spreadIndex + 1 });
    } else if (view.chapterIndex + 1 < story.chapters.length) {
      // Move into next chapter
      setDirection(1);
      setView({ mode: "reading", chapterIndex: view.chapterIndex + 1, spreadIndex: 0 });
    } else {
      // End of book — return to cover
      goToCover();
    }
  };

  const prevSpread = () => {
    if (view.mode !== "reading") return;
    if (view.spreadIndex > 0) {
      setDirection(-1);
      setView({ ...view, spreadIndex: view.spreadIndex - 1 });
    } else if (view.chapterIndex > 0) {
      const prevChapter = story.chapters[view.chapterIndex - 1];
      const prevSpreadCount = Math.ceil(prevChapter.pages.length / 2);
      setDirection(-1);
      setView({
        mode: "reading",
        chapterIndex: view.chapterIndex - 1,
        spreadIndex: prevSpreadCount - 1,
      });
    } else {
      goToCover();
    }
  };

  const isFirstSpread = view.mode === "reading" && view.chapterIndex === 0 && view.spreadIndex === 0;
  const isLastSpread =
    view.mode === "reading" &&
    view.chapterIndex === story.chapters.length - 1 &&
    view.spreadIndex === spreads.length - 1;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Back button — top-left, only visible while reading */}
      {view.mode === "reading" && (
        <button
          onClick={goToCover}
          className="absolute -top-3 -left-3 sm:top-2 sm:left-2 z-20 flex items-center gap-1.5 font-display text-sm font-semibold px-4 py-2 rounded-[var(--radius-toy-pill)] bg-paper shadow-[var(--shadow-toy-md)] text-ink hover:text-terracotta transition-colors"
          aria-label="Back to chapter list"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Chapters
        </button>
      )}

      {/* Book surface */}
      <div
        className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[var(--radius-toy-lg)] shadow-[var(--shadow-toy-lg)] bg-wood overflow-hidden p-2 sm:p-3"
        style={{ perspective: "1600px" }}
      >
        <div className="relative h-full w-full rounded-[var(--radius-toy-md)] overflow-hidden bg-cream-deep">
          {view.mode === "cover" ? (
            <ChapterSelector story={story} onSelectChapter={selectChapter} />
          ) : (
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={`${view.chapterIndex}-${view.spreadIndex}`}
                custom={direction}
                variants={reduced ? reducedVariants : spreadVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 p-2 sm:p-3"
                style={{ transformStyle: "preserve-3d" }}
              >
                {currentSpread?.map((page, i) => (
                  <BookPage key={page.id} page={page} side={i === 0 ? "left" : "right"} />
                ))}
                {/* If odd page count, fill the remaining slot with a blank page */}
                {currentSpread && currentSpread.length === 1 && (
                  <div className="hidden sm:block rounded-[var(--radius-toy-md)] bg-paper" />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Page navigation controls — bottom, only while reading */}
      {view.mode === "reading" && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={prevSpread}
            disabled={isFirstSpread}
            className="flex items-center gap-1.5 font-display text-sm font-semibold px-4 py-2 rounded-[var(--radius-toy-pill)] bg-paper shadow-[var(--shadow-toy-sm)] text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:text-terracotta transition-colors"
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>

          <p className="font-display text-xs text-ink-soft">
            {chapter?.title} · {view.spreadIndex + 1} / {spreads.length}
          </p>

          <button
            onClick={nextSpread}
            className="flex items-center gap-1.5 font-display text-sm font-semibold px-4 py-2 rounded-[var(--radius-toy-pill)] bg-paper shadow-[var(--shadow-toy-sm)] text-ink hover:text-terracotta transition-colors"
            aria-label={isLastSpread ? "Finish story" : "Next page"}
          >
            {isLastSpread ? "Finish" : "Next"}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
