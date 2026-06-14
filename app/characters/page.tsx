import { PageTransition } from "@/components/layout/PageTransition";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { CharacterGrid } from "@/components/characters/CharacterGrid";

export default function CharactersPage() {
  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-12 text-center">
        <RevealOnScroll>
          <p className="font-gurmukhi-locked text-xl text-terracotta mb-2">ਕਿਰਦਾਰ</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
            Meet the Village
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl mx-auto">
            Nineteen friends — family, friends, and farmyard companions —
            each with their own story, voice, and place in Ajjo Khediye.
          </p>
        </RevealOnScroll>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <CharacterGrid />
      </section>
    </PageTransition>
  );
}
