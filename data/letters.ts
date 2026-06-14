export interface GurmukhiLetter {
  char: string;
  /** Romanized transliteration for accessibility labels / non-Gurmukhi readers. */
  roman: string;
  /** Base XP value when caught (modified by combo multiplier in gameStore). */
  basePoints: number;
}

/**
 * The full Gurmukhi vowel-bearer and consonant set used by the
 * hero letter-catching mini-game. Rendered as static sprites —
 * never animated as typography (see Gurmukhi lock rule).
 */
export const gurmukhiLetters: GurmukhiLetter[] = [
  { char: "ੳ", roman: "ura", basePoints: 10 },
  { char: "ਅ", roman: "aira", basePoints: 10 },
  { char: "ੲ", roman: "iri", basePoints: 10 },
  { char: "ਸ", roman: "sassa", basePoints: 10 },
  { char: "ਹ", roman: "haha", basePoints: 10 },
  { char: "ਕ", roman: "kakka", basePoints: 10 },
  { char: "ਖ", roman: "khakha", basePoints: 10 },
  { char: "ਗ", roman: "gagga", basePoints: 10 },
  { char: "ਘ", roman: "ghagha", basePoints: 10 },
  { char: "ਙ", roman: "nganga", basePoints: 15 },
  { char: "ਚ", roman: "chacha", basePoints: 10 },
  { char: "ਛ", roman: "chhachha", basePoints: 10 },
  { char: "ਜ", roman: "jaja", basePoints: 10 },
  { char: "ਝ", roman: "jhajha", basePoints: 10 },
  { char: "ਞ", roman: "nyanya", basePoints: 15 },
  { char: "ਟ", roman: "tainka", basePoints: 10 },
  { char: "ਠ", roman: "thatha", basePoints: 10 },
  { char: "ਡ", roman: "dadda", basePoints: 10 },
  { char: "ਢ", roman: "dhadha", basePoints: 10 },
  { char: "ਣ", roman: "nana", basePoints: 15 },
  { char: "ਤ", roman: "tatta", basePoints: 10 },
  { char: "ਥ", roman: "thatha2", basePoints: 10 },
  { char: "ਦ", roman: "dadda2", basePoints: 10 },
  { char: "ਧ", roman: "dhadha2", basePoints: 10 },
  { char: "ਨ", roman: "nanna", basePoints: 10 },
  { char: "ਪ", roman: "pappa", basePoints: 10 },
  { char: "ਫ", roman: "phapha", basePoints: 10 },
  { char: "ਬ", roman: "babba", basePoints: 10 },
  { char: "ਭ", roman: "bhabha", basePoints: 10 },
  { char: "ਮ", roman: "mamma", basePoints: 10 },
  { char: "ਯ", roman: "yayya", basePoints: 15 },
  { char: "ਰ", roman: "rara", basePoints: 10 },
  { char: "ਲ", roman: "lalla", basePoints: 10 },
  { char: "ਵ", roman: "vava", basePoints: 10 },
  { char: "ੜ", roman: "rara2", basePoints: 15 },
];

/** Returns a random letter from the set, optionally excluding recent ones. */
export function getRandomLetter(exclude: string[] = []): GurmukhiLetter {
  const pool = gurmukhiLetters.filter((l) => !exclude.includes(l.char));
  const source = pool.length > 0 ? pool : gurmukhiLetters;
  return source[Math.floor(Math.random() * source.length)];
}
