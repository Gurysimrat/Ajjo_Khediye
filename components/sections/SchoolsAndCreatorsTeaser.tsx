import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

interface TeaserCardProps {
  href: string;
  emoji: string;
  titleGurmukhi: string;
  title: string;
  description: string;
  accent: string;
}

function TeaserCard({ href, emoji, titleGurmukhi, title, description, accent }: TeaserCardProps) {
  return (
    <Link
      href={href}
      className="group flex-1 rounded-[var(--radius-toy-lg)] bg-paper p-8 shadow-[var(--shadow-toy-md)] hover:shadow-[var(--shadow-toy-lg)] transition-shadow"
    >
      <div
        className="w-14 h-14 rounded-[var(--radius-toy-md)] flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: `${accent}1f` }}
        aria-hidden="true"
      >
        {emoji}
      </div>
      <p className="font-gurmukhi-locked text-sm text-terracotta mb-1">{titleGurmukhi}</p>
      <h3 className="font-display text-2xl font-bold text-ink mb-2 group-hover:text-terracotta transition-colors">
        {title}
      </h3>
      <p className="text-ink-soft text-sm">{description}</p>
      <p className="mt-4 font-display text-sm font-semibold" style={{ color: accent }}>
        Learn more →
      </p>
    </Link>
  );
}

/**
 * Dual-CTA band introducing the Schools and Creators ecosystems —
 * sits near the bottom of the homepage as a "what's next" prompt
 * for institutional and community visitors.
 */
export function SchoolsAndCreatorsTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Bring the village further
            </h2>
            <p className="mt-2 text-ink-soft max-w-xl mx-auto">
              Ajjo Khediye is built to grow — into classrooms, and with the
              people who make it.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div className="flex flex-col sm:flex-row gap-6">
            <TeaserCard
              href="/schools"
              emoji="🏫"
              titleGurmukhi="ਸਕੂਲ"
              title="For Schools"
              description="Bring Ajjo Khediye's videos and worksheets into your classroom, on your smart screens."
              accent="var(--color-leaf)"
            />
            <TeaserCard
              href="/creators"
              emoji="🎨"
              titleGurmukhi="ਸਿਰਜਣਹਾਰ"
              title="For Creators"
              description="Storytellers, artists, and musicians — join the Village Gallery and help shape what comes next."
              accent="var(--color-marigold)"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
