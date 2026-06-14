import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCharacterBySlug, characters } from "@/data/characters";
import { PageTransition } from "@/components/layout/PageTransition";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { CharacterHero } from "@/components/characters/CharacterHero";
import { InfoCard } from "@/components/characters/InfoCard";
import { PaletteSwatches } from "@/components/characters/PaletteSwatches";
import { RelatedCharacters } from "@/components/characters/RelatedCharacters";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) return {};
  return {
    title: `${character.name} | Ajjo Khediye`,
    description: character.tagline,
  };
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) notFound();

  return (
    <PageTransition>
      <CharacterHero character={character} />

      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-8">
        {/* Visual description */}
        <RevealOnScroll>
          <InfoCard title="Visual Description">
            <p>{character.visualDescription}</p>
          </InfoCard>
        </RevealOnScroll>

        {/* Plush details — locked, only for plush-only characters. No reference sheet shown. */}
        {character.plush && (
          <RevealOnScroll delay={0.03}>
            <InfoCard title={`${character.name} — Plush Details`}>
              <p className="mb-3">
                {character.name} exists as a{" "}
                <span className="font-semibold text-ink">plush toy only</span> — approximately{" "}
                {character.plush.sizeCm}cm.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
                    Poses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {character.plush.poses.map((pose) => (
                      <Badge key={pose} tone="leaf">
                        {pose}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
                    Expressions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {character.plush.expressions.map((exp) => (
                      <Badge key={exp} tone="marigold">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {character.plush.variants.length > 1 && (
                <div className="mt-4">
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
                    Collect Them All
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {character.plush.variants.map((v) => (
                      <Badge key={v} tone="terracotta">
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </InfoCard>
          </RevealOnScroll>
        )}

        {/* Personality + Voice */}
        <RevealOnScroll delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoCard title="Personality">
              <div className="flex flex-wrap gap-2 mb-3">
                {character.personality.traits.map((trait) => (
                  <Badge key={trait} tone="leaf">
                    {trait}
                  </Badge>
                ))}
              </div>
              <p>
                <span className="font-semibold text-ink">Strength: </span>
                {character.personality.strength}
              </p>
              <p>
                <span className="font-semibold text-ink">Flaw: </span>
                {character.personality.flaw}
              </p>
              <p>
                <span className="font-semibold text-ink">Culture: </span>
                {character.personality.culture}
              </p>
            </InfoCard>

            <InfoCard title="Voice & Dialogue">
              <p>{character.voice.description}</p>
              {character.voice.signature.length > 0 && (
                <div className="pt-1">
                  {character.voice.signature.map((line) => (
                    <p key={line} className="font-gurmukhi-locked text-terracotta italic">
                      &ldquo;{line}&rdquo;
                    </p>
                  ))}
                </div>
              )}
              {character.voice.addressing && (
                <p className="text-xs text-ink-soft/80 pt-1">{character.voice.addressing}</p>
              )}
            </InfoCard>
          </div>
        </RevealOnScroll>

        {/* Story Role + Cultural Anchor */}
        <RevealOnScroll delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoCard title="Story Role">
              <p>
                <span className="font-semibold text-ink">Drives: </span>
                {character.storyRole.drives}
              </p>
              <p>
                <span className="font-semibold text-ink">Role: </span>
                {character.storyRole.role}
              </p>
              <p>
                <span className="font-semibold text-ink">Never: </span>
                {character.storyRole.never}
              </p>
            </InfoCard>

            <InfoCard title="Cultural Anchor">
              <p>
                <span className="font-semibold text-ink">Represents: </span>
                {character.culturalAnchor.represents}
              </p>
              <p>
                <span className="font-semibold text-ink">Props: </span>
                {character.culturalAnchor.props}
              </p>
              <p>
                <span className="font-semibold text-ink">Peak moments: </span>
                {character.culturalAnchor.peak}
              </p>
            </InfoCard>
          </div>
        </RevealOnScroll>

        {/* Color palette */}
        <RevealOnScroll delay={0.05}>
          <InfoCard title="Color Palette">
            <PaletteSwatches colors={character.colorPalette} />
          </InfoCard>
        </RevealOnScroll>

        {/* Episode types + VO tone */}
        <RevealOnScroll delay={0.05}>
          <InfoCard title="Episode Types & Voice Tone">
            <div className="flex flex-wrap gap-2 mb-3">
              {character.agentFlags.episodeTypes.map((type) => (
                <Badge key={type} tone="marigold">
                  {type}
                </Badge>
              ))}
            </div>
            <p>
              <span className="font-semibold text-ink">VO tone: </span>
              {character.agentFlags.voTone}
            </p>
          </InfoCard>
        </RevealOnScroll>

        {/* Related characters */}
        {(character.storyRole.pairsWith.length > 0 ||
          (character.agentFlags.neverPairWith?.length ?? 0) > 0) && (
          <RevealOnScroll delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {character.storyRole.pairsWith.length > 0 && (
                <InfoCard>
                  <RelatedCharacters
                    slugs={character.storyRole.pairsWith}
                    label="Often appears with"
                  />
                </InfoCard>
              )}
              {(character.agentFlags.neverPairWith?.length ?? 0) > 0 && (
                <InfoCard>
                  <RelatedCharacters
                    slugs={character.agentFlags.neverPairWith!}
                    label="Rarely paired with"
                  />
                </InfoCard>
              )}
            </div>
          </RevealOnScroll>
        )}
      </section>
    </PageTransition>
  );
}
