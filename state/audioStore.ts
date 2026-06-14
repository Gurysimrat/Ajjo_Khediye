import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioState {
  /** Default to muted per autoplay policy + accessibility. */
  muted: boolean;
  volume: number; // 0–1

  toggleMuted: () => void;
  setVolume: (v: number) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      muted: true,
      volume: 0.6,

      toggleMuted: () => set({ muted: !get().muted }),
      setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
    }),
    { name: "ajjo-audio-prefs" }
  )
);
