import type { Variants, Easing } from "framer-motion";
import { durations } from "./tokens";

/**
 * Framer Motion v12 requires `ease` as a cubic-bezier array, a named
 * easing keyword, or a function — not a raw CSS cubic-bezier() string.
 * These mirror the CSS tokens in lib/animations/tokens.ts.
 */
const easeToyBounce: Easing = [0.34, 1.56, 0.64, 1];
const easeToySoft: Easing = [0.45, 0, 0.2, 1];

/**
 * Shared Framer Motion variants — the "toy bounce" entrance language
 * used across the site. Compose these into components rather than
 * writing one-off transitions.
 */

export const toyPop: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easeToyBounce,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.medium, ease: easeToySoft },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.medium, ease: easeToySoft },
  },
};

/** Stagger container — wrap children with `toyPop` or `fadeUp`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Button / card press feedback. */
export const pressable: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -2, transition: { duration: durations.micro, ease: easeToyBounce } },
  tap: { scale: 0.97, y: 1, transition: { duration: durations.micro, ease: easeToySoft } },
};

/** XP floater — rises and fades. */
export const xpFloat: Variants = {
  hidden: { opacity: 0, y: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    y: -48,
    scale: 1,
    transition: { duration: 0.9, ease: easeToyBounce },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

/** Uda Singh callout bubble entrance. */
export const udaBubble: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 20, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: easeToyBounce },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.3, ease: easeToySoft },
  },
};

/** Reduced-motion safe variants — instant, no movement. */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
