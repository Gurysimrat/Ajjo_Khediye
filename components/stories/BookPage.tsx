import Image from "next/image";
import type { StoryPage } from "@/data/stories";

interface BookPageProps {
  page: StoryPage;
  /** "left" pages get a subtle inner shadow on their right edge, "right" on their left. */
  side: "left" | "right";
}

/**
 * Renders the content of a single book page — either a supplied comic
 * image, or a placeholder layout (emoji + heading + body), with an
 * inner spine shadow appropriate to which side of the spread it's on.
 */
export function BookPage({ page, side }: BookPageProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[var(--radius-toy-md)] flex flex-col items-center justify-center text-center p-6 sm:p-10"
      style={{ backgroundColor: page.tint ?? "var(--color-paper)" }}
    >
      {page.image ? (
        <Image
          src={page.image}
          alt={page.heading ?? "Story page"}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      ) : (
        <>
          {page.placeholderEmoji && (
            <span className="text-5xl sm:text-6xl mb-4" aria-hidden="true">
              {page.placeholderEmoji}
            </span>
          )}
          {page.headingGurmukhi && (
            <p className="font-gurmukhi-locked text-base sm:text-lg text-terracotta mb-2">
              {page.headingGurmukhi}
            </p>
          )}
          {page.heading && (
            <h3 className="font-display text-lg sm:text-2xl font-bold text-ink mb-2 max-w-sm">
              {page.heading}
            </h3>
          )}
          {page.body && (
            <p className="text-sm sm:text-base text-ink-soft max-w-sm">{page.body}</p>
          )}
        </>
      )}

      {/* Inner spine shadow */}
      <div
        className={`absolute inset-y-0 w-6 pointer-events-none ${
          side === "left"
            ? "right-0 bg-gradient-to-l from-black/10 to-transparent"
            : "left-0 bg-gradient-to-r from-black/10 to-transparent"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
