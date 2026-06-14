"use client";

import { useRef, useState, useEffect } from "react";
import { GameCanvas } from "./GameCanvas";
import { XPFloater } from "./XPFloater";
import { ComboMeter } from "./ComboMeter";
import { UdaCallout, type UdaCalloutHandle } from "@/components/characters/UdaCallout";
import { soundManager } from "@/components/game/SoundManager";
import { useAudioStore } from "@/state/audioStore";

/**
 * Orchestrates the hero letter-catching mini-game: canvas render layer,
 * XP/combo HUD, floating XP indicators, and Uda Singh's encouragement
 * callouts. Mounted inside the Hero section, above the EnvironmentalLayer.
 */
export function HeroLetterGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const udaHandleRef = useRef<UdaCalloutHandle | null>(null);
  const muted = useAudioStore((s) => s.muted);
  const toggleMuted = useAudioStore((s) => s.toggleMuted);
  const [started, setStarted] = useState(false);

  // Resume the (suspended-by-default) audio context on first interaction.
  useEffect(() => {
    const resume = () => soundManager.resume();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onPointerDown={() => setStarted(true)}
    >
      <GameCanvas
        containerRef={containerRef}
        onComboMilestone={(combo) => udaHandleRef.current?.triggerCombo(combo)}
      />
      <XPFloater />
      <ComboMeter />
      <UdaCallout onReady={(h) => (udaHandleRef.current = h)} />

      {/* Sound toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMuted();
        }}
        className="absolute top-24 right-4 sm:right-6 z-10 w-11 h-11 rounded-[var(--radius-toy-pill)] bg-paper/90 backdrop-blur shadow-[var(--shadow-toy-sm)] flex items-center justify-center text-lg"
        aria-label={muted ? "Unmute game sounds" : "Mute game sounds"}
        aria-pressed={!muted}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* First-visit hint */}
      {!started && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-display text-sm text-ink-soft bg-paper/80 backdrop-blur px-4 py-2 rounded-[var(--radius-toy-pill)] shadow-[var(--shadow-toy-sm)] pointer-events-none"
          aria-hidden="true"
        >
          Move your mouse to catch falling letters ✨
        </div>
      )}
    </div>
  );
}
