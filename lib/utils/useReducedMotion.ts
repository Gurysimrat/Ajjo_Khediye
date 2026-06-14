"use client";

import { useEffect, useState } from "react";

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns true if the user has requested reduced motion at the OS level.
 * Use this to gate ambient loops, parallax, and auto-triggered particle
 * effects. Functional feedback (XP, combo) should remain but can be
 * shortened rather than fully disabled.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitialReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
