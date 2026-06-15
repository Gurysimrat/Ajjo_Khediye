/**
 * Story data model. Each story has chapters; each chapter has pages.
 * Pages can be image-based (comic panels, supplied later) or
 * text/illustration placeholders until real artwork is ready.
 *
 * The FIRST PAGE of the FIRST CHAPTER of the featured story carries
 * the brand mission statement, centered, per the homepage spec.
 */

export interface StoryPage {
  id: string;
  /** Path to a comic page image. Optional — falls back to placeholder. */
  image?: string;
  /** Centered headline text (used for mission/title pages). */
  heading?: string;
  /** Gurmukhi heading — rendered with the locked class, never animated. */
  headingGurmukhi?: string;
  /** Body copy below the heading, or caption for an image page. */
  body?: string;
  /** Emoji or short glyph used as a placeholder illustration. */
  placeholderEmoji?: string;
  /** Background tint for placeholder pages. */
  tint?: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  titleGurmukhi?: string;
  pages: StoryPage[];
}

export interface Story {
  slug: string;
  title: string;
  titleGurmukhi: string;
  description: string;
  coverEmoji: string;
  accentColor: string;
  chapters: StoryChapter[];
}

export const stories: Story[] = [
  {
    slug: "welcome-to-ajjo-khediye",
    title: "Welcome to Ajjo Khediye",
    titleGurmukhi: "ਅੱਜੋ ਖੇਡੀਏ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    description:
      "An introduction to the village, its people, and why we're building a home for Punjabi language and culture online.",
    coverEmoji: "📖",
    accentColor: "var(--color-terracotta)",
    chapters: [
      {
        id: "chapter-1",
        title: "Our Mission",
        titleGurmukhi: "ਸਾਡਾ ਮਿਸ਼ਨ",
        pages: [
          {
            id: "1-1",
            heading: "Every child deserves to grow up with their language.",
            headingGurmukhi: "ਹਰ ਬੱਚੇ ਨੂੰ ਆਪਣੀ ਬੋਲੀ ਨਾਲ ਵੱਡਾ ਹੋਣ ਦਾ ਹੱਕ ਹੈ।",
            body: "Ajjo Khediye exists to keep Punjabi alive for the next generation — through stories, songs, and play, wherever kids grow up in the world.",
            tint: "var(--color-cream)",
          },
          {
            id: "1-2",
            placeholderEmoji: "🏡",
            heading: "A village, waiting to be explored",
            body: "Mud-brick homes, marigold fields, and a charpai under the neem tree — this is where every adventure begins.",
            tint: "var(--color-marigold-soft)",
          },
          {
            id: "1-3",
            placeholderEmoji: "🧒",
            heading: "Meet Uda Singh",
            headingGurmukhi: "ਉੜਾ ਸਿੰਘ",
            body: "Curious, hungry, and always asking 'eda ki hunda?' — Uda Singh leads every adventure with wide eyes and an even wider appetite.",
            tint: "var(--color-leaf-soft)",
          },
          {
            id: "1-4",
            placeholderEmoji: "🐄",
            heading: "And the friends who join him",
            body: "Edi Kaur, Paalo the cow, Gittu the goat, Hoot Singh the owl — nineteen friends, and counting, all waiting in the village.",
            tint: "var(--color-sky)",
          },
        ],
      },
      {
        id: "chapter-2",
        title: "The Morning Chores",
        titleGurmukhi: "ਸਵੇਰ ਦਾ ਕੰਮ",
        pages: [
          {
            id: "2-1",
            placeholderEmoji: "🌅",
            heading: "The sun rises over the fields",
            body: "Kukdi Rani is already awake, announcing the morning to anyone who'll listen — which, this early, is mostly Paalo.",
            tint: "var(--color-marigold-soft)",
          },
          {
            id: "2-2",
            placeholderEmoji: "🥛",
            heading: "Time to milk Paalo",
            body: "Uda Singh helps Papa Ji with the morning milking — though he's mostly there for the warm glass of milk afterward.",
            tint: "var(--color-cream-deep)",
          },
          {
            id: "2-3",
            placeholderEmoji: "📚",
            heading: "Edi Kaur has a new word",
            headingGurmukhi: "ਅੱਜ ਦਾ ਨਵਾਂ ਅੱਖਰ",
            body: "Every morning, Edi Kaur teaches Uda a new Gurmukhi letter — today it's ੳ, and she's very proud of it.",
            tint: "var(--color-leaf-soft)",
          },
        ],
      },
      {
        id: "chapter-3",
        title: "Gittu's Big Adventure",
        titleGurmukhi: "ਗਿੱਟੂ ਦੀ ਛਾਲ",
        pages: [
          {
            id: "3-1",
            placeholderEmoji: "🐐",
            heading: "Gittu never walks when he can leap",
            body: "Today, Gittu has spotted something across the field — and nothing is going to stop him from getting there first.",
            tint: "var(--color-sky)",
          },
          {
            id: "3-2",
            placeholderEmoji: "🦋",
            heading: "Chasing butterflies",
            body: "Tappu the frog joins in — between the two of them, the whole field is one big game of tag.",
            tint: "var(--color-wool-pink)",
          },
          {
            id: "3-3",
            placeholderEmoji: "🎉",
            heading: "Everyone joins the chase",
            body: "By the time Uda Singh catches up, half the village is running through the marigolds — and nobody remembers why.",
            tint: "var(--color-marigold-soft)",
          },
        ],
      },
      {
        id: "chapter-4",
        title: "Evening Stories",
        titleGurmukhi: "ਸ਼ਾਮ ਦੀਆਂ ਕਹਾਣੀਆਂ",
        pages: [
          {
            id: "4-1",
            placeholderEmoji: "🌇",
            heading: "As the sun sets",
            body: "The village gathers on charpais in the courtyard, and Daada Ji clears his throat — it's storytelling time.",
            tint: "var(--color-navy-soft)",
          },
          {
            id: "4-2",
            placeholderEmoji: "🪔",
            heading: "\"Pehla vi eh hunda si...\"",
            headingGurmukhi: "ਪਹਿਲਾਂ ਵੀ ਇਹ ਹੁੰਦਾ ਸੀ...",
            body: "Daada Ji's stories always start the same way — and somehow, they're never the same story twice.",
            tint: "var(--color-cream-deep)",
          },
          {
            id: "4-3",
            placeholderEmoji: "🌙",
            heading: "Goodnight, Ajjo Khediye",
            body: "One by one, the lights go out across the village. Tomorrow, there's a new letter to learn, and a new adventure waiting.",
            tint: "var(--color-sky)",
          },
        ],
      },
    ],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
