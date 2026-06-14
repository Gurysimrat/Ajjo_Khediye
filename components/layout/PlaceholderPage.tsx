import { PageTransition } from "@/components/layout/PageTransition";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Card } from "@/components/ui/Card";

interface PlaceholderPageProps {
  title: string;
  titleGurmukhi?: string;
  description: string;
}

/**
 * Shared placeholder used by stub routes during foundation build-out.
 * Replace with route-specific implementations in later steps.
 */
export function PlaceholderPage({ title, titleGurmukhi, description }: PlaceholderPageProps) {
  return (
    <PageTransition>
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
        <RevealOnScroll>
          {titleGurmukhi && (
            <p className="font-gurmukhi-locked text-xl text-terracotta mb-2">
              {titleGurmukhi}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold text-ink">{title}</h1>
          <Card className="mt-8 text-left">
            <p className="text-ink-soft">{description}</p>
          </Card>
        </RevealOnScroll>
      </section>
    </PageTransition>
  );
}
