import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { WorldPreviewStrip } from "@/components/sections/WorldPreviewStrip";
import { StorybookSection } from "@/components/sections/StorybookSection";
import { SchoolsAndCreatorsTeaser } from "@/components/sections/SchoolsAndCreatorsTeaser";

/**
 * Homepage: fullscreen interactive hero (letter-catching game), a
 * horizontally-scrolling cast preview, an interactive open-book story
 * reader, and a dual CTA band for Schools/Creators.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <WorldPreviewStrip />
      <StorybookSection />
      <SchoolsAndCreatorsTeaser />
    </PageTransition>
  );
}
