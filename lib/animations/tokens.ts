/**
 * Design tokens — single source of truth for values needed in
 * JavaScript/TypeScript (Canvas rendering, GSAP timelines, dynamic
 * inline styles). Keep in sync with app/globals.css custom properties.
 */

export const colors = {
  cream: "#FBF3E4",
  creamDeep: "#F3E6CF",
  terracotta: "#E8613A",
  terracottaSoft: "#F3A08A",
  marigold: "#F5A623",
  marigoldSoft: "#FCD98A",
  leaf: "#4CAF6A",
  leafSoft: "#A8DDBA",
  navy: "#1B2A4A",
  navySoft: "#3A4F7A",
  woolPink: "#F2A6A1",
  sky: "#BFE3F0",
  skyDeep: "#8FCBE0",
  wood: "#8B5E3C",
  woodLight: "#C19A6B",
  ink: "#2E2A26",
  inkSoft: "#5C5550",
  paper: "#FFFAF0",
} as const;

/** Locked emphasis colors for speech-bubble text per character bible rules. */
export const emphasisColors = {
  marigold: colors.marigold, // #F5A623
  leaf: colors.leaf, // #4CAF6A
  terracotta: colors.terracotta, // #E8613A
} as const;

export const radii = {
  sm: 14,
  md: 20,
  lg: 32,
  pill: 9999,
} as const;

export const easings = {
  toyBounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  toySoft: "cubic-bezier(0.45, 0, 0.2, 1)",
} as const;

/** GSAP-friendly easing strings (registered via CustomEase if needed). */
export const gsapEasings = {
  toyBounce: "back.out(1.7)",
  toySoft: "power2.inOut",
  ambient: "sine.inOut",
} as const;

export const durations = {
  micro: 0.18,
  medium: 0.5,
  ambient: 14,
} as const;

export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
