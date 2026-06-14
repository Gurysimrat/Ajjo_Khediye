interface PaletteSwatchesProps {
  colors: string[];
}

/** Renders a row of color swatches with hex labels — for the character's bible palette. */
export function PaletteSwatches({ colors }: PaletteSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-3" role="list" aria-label="Color palette">
      {colors.map((hex) => (
        <div key={hex} className="flex flex-col items-center gap-1" role="listitem">
          <span
            className="w-10 h-10 rounded-[var(--radius-toy-sm)] shadow-[var(--shadow-toy-sm)] border border-wood-light/20"
            style={{ backgroundColor: hex }}
            aria-hidden="true"
          />
          <span className="font-display text-[10px] text-ink-soft uppercase tracking-wide">
            {hex}
          </span>
        </div>
      ))}
    </div>
  );
}
