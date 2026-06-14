"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { udaBubble, reducedMotionVariants } from "@/lib/animations/framerVariants";
import { useReducedMotion } from "@/lib/utils/useReducedMotion";

const IDLE_MESSAGES = [
  { en: "Catch the letters falling from the sky!", pa: "ਅਸਮਾਨ ਤੋਂ ਡਿੱਗਦੇ ਅੱਖਰ ਫੜੋ!" },
  { en: "Move your basket to follow the letters.", pa: "ਅੱਖਰਾਂ ਦਾ ਪਿੱਛਾ ਕਰਨ ਲਈ ਆਪਣੀ ਟੋਕਰੀ ਹਿਲਾਓ।" },
  { en: "Every letter you catch, you learn!", pa: "ਜੋ ਅੱਖਰ ਤੁਸੀਂ ਫੜਦੇ ਹੋ, ਉਹ ਸਿੱਖਦੇ ਵੀ ਹੋ!" },
];

const COMBO_MESSAGES = [
  { en: "Wah! You're on fire!", pa: "ਵਾਹ! ਤੁਸੀਂ ਕਮਾਲ ਕਰ ਰਹੇ ਹੋ!" },
  { en: "Look at that combo!", pa: "ਇਹ ਲੜੀ ਦੇਖੋ!" },
  { en: "Shabash! Keep going!", pa: "ਸ਼ਾਬਾਸ਼! ਚਲਦੇ ਰਹੋ!" },
];

export interface UdaCalloutHandle {
  triggerCombo: (combo: number) => void;
}

interface UdaCalloutProps {
  /** Exposes a trigger function via ref for combo-driven callouts. */
  onReady?: (handle: UdaCalloutHandle) => void;
}

/**
 * Uda Singh's encouragement bubble. Appears periodically (idle timer)
 * and also on combo milestones (triggered externally via onReady handle).
 * Dual Gurmukhi/English text; Gurmukhi rendered with the locked class.
 */
export function UdaCallout({ onReady }: UdaCalloutProps) {
  const [message, setMessage] = useState<{ en: string; pa: string } | null>(null);
  const reduced = useReducedMotion();
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: { en: string; pa: string }, duration = 5000) => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    setMessage(msg);
    dismissTimerRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  // Idle encouragement loop — every ~50s
  useEffect(() => {
    let i = 0;
    idleTimerRef.current = setInterval(() => {
      show(IDLE_MESSAGES[i % IDLE_MESSAGES.length]);
      i++;
    }, 50000);

    // First appearance after a short delay so it doesn't compete with hero load
    const firstTimer = setTimeout(() => show(IDLE_MESSAGES[0]), 6000);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      clearTimeout(firstTimer);
    };
  }, [show]);

  // Expose combo-trigger handle to parent (HeroLetterGame)
  useEffect(() => {
    onReady?.({
      triggerCombo: (combo: number) => {
        const pool = combo >= 10 ? COMBO_MESSAGES.slice(1) : COMBO_MESSAGES;
        const msg = pool[Math.floor(Math.random() * pool.length)];
        show(msg, 3500);
      },
    });
  }, [onReady, show]);

  return (
    <div className="absolute bottom-28 sm:bottom-32 right-4 sm:right-8 z-10 max-w-[260px]">
      <AnimatePresence>
        {message && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={reduced ? reducedMotionVariants : udaBubble}
            className="relative bg-paper rounded-[var(--radius-toy-lg)] shadow-[var(--shadow-toy-lg)] p-4 pl-20"
            role="status"
          >
            {/* Uda Singh avatar placeholder */}
            <div
              className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-terracotta-soft flex items-center justify-center text-2xl shadow-[var(--shadow-toy-md)]"
              aria-hidden="true"
            >
              🧒
            </div>
            <p className="font-gurmukhi-locked text-sm text-terracotta mb-1">{message.pa}</p>
            <p className="font-display text-sm text-ink-soft">{message.en}</p>

            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-2 left-20 w-4 h-4 bg-paper rotate-45"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
