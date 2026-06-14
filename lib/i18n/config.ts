import en from "./dictionaries/en.json";
import pa from "./dictionaries/pa.json";

export const locales = ["en", "pa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, typeof en> = { en, pa };

/**
 * Synchronous dictionary getter. Dictionaries are small and bundled;
 * if they grow significantly, switch to dynamic import per locale.
 *
 * IMPORTANT: Gurmukhi strings returned here must always be rendered
 * with `.font-gurmukhi-locked` and must never be animated/morphed.
 */
export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
