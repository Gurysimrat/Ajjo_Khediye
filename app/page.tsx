import { PageTransition } from "@/components/layout/PageTransition";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/sections/Hero";

/**
 * Homepage: fullscreen interactive hero (letter-catching game) plus
 * a foundation status card. World preview, featured story, character
 * teaser, and schools/creators teaser sections land in later steps.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <RevealOnScroll>
          <Card textured>
            <h2 className="font-display text-2xl font-semibold text-terracotta">
              The village is waking up
            </h2>
            <p className="mt-2 text-ink-soft">
              You just played the hero letter-catching game — every letter
              you catch is added to your collection. World preview, featured
              stories, and character teasers arrive in the next pass.
            </p>
          </Card>
        </RevealOnScroll>
      </section>
    </PageTransition>
  );
}
