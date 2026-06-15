import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { BookReader } from "@/components/stories/BookReader";
import { getStoryBySlug } from "@/data/stories";

/**
 * Homepage section presenting the open-book story reader directly —
 * sits under the hero/game area. Uses the featured "Welcome to Ajjo
 * Khediye" story whose first page carries the brand mission statement.
 */
export function StorybookSection() {
  const story = getStoryBySlug("welcome-to-ajjo-khediye");
  if (!story) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-deep">
      <div className="max-w-3xl mx-auto px-6 text-center mb-8">
        <RevealOnScroll>
          <p className="font-gurmukhi-locked text-lg text-terracotta mb-1">ਕਹਾਣੀਆਂ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Open a story, open a world
          </h2>
          <p className="mt-2 text-ink-soft max-w-xl mx-auto">
            Tap a chapter to begin — flip through pages just like a real
            storybook, right here on the homepage.
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.1}>
        <div className="px-6">
          <BookReader story={story} />
        </div>
      </RevealOnScroll>
    </section>
  );
}
