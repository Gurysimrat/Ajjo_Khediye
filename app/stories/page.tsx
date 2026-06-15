import { PageTransition } from "@/components/layout/PageTransition";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { BookReader } from "@/components/stories/BookReader";
import { stories } from "@/data/stories";

export default function StoriesPage() {
  return (
    <PageTransition>
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-12 text-center">
        <RevealOnScroll>
          <p className="font-gurmukhi-locked text-xl text-terracotta mb-2">ਕਹਾਣੀਆਂ</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">The Storybook</h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl mx-auto">
            Tap a chapter to open the book — flip through pages, meet the
            village, and discover a new story.
          </p>
        </RevealOnScroll>
      </section>

      <section className="pb-24">
        {stories.map((story) => (
          <div key={story.slug} className="px-6 mb-16">
            <RevealOnScroll>
              <BookReader story={story} />
            </RevealOnScroll>
          </div>
        ))}
      </section>
    </PageTransition>
  );
}
