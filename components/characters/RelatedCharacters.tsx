import Link from "next/link";
import { getCharacterBySlug } from "@/data/characters";

interface RelatedCharactersProps {
  slugs: string[];
  /** Heading label, e.g. "Often appears with" or "Rarely paired with". */
  label: string;
}

/** Renders a row of linked character chips — used for "pairs with" / "never pair with". */
export function RelatedCharacters({ slugs, label }: RelatedCharactersProps) {
  const found = slugs.map((slug) => getCharacterBySlug(slug)).filter(Boolean);
  if (found.length === 0) return null;

  return (
    <div>
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {found.map((c) => (
          <Link
            key={c!.slug}
            href={`/characters/${c!.slug}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-toy-pill)] bg-cream-deep text-sm font-display text-ink hover:bg-marigold-soft transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c!.accentColor }}
              aria-hidden="true"
            />
            {c!.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
