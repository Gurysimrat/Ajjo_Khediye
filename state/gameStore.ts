import { create } from "zustand";

export interface XPFloaterEvent {
  id: string;
  amount: number;
  x: number;
  y: number;
}

interface GameState {
  /** Total XP earned in the current session (catching letters). */
  xp: number;
  /** Current combo streak (consecutive catches without a miss). */
  combo: number;
  /** Highest combo reached this session. */
  bestCombo: number;
  /** Letters caught this session. */
  lettersCaught: number;
  /** Queue of XP floater events for the UI to render & dismiss. */
  floaters: XPFloaterEvent[];
  /** Whether sound is enabled (persisted via audioStore separately). */
  isPlaying: boolean;

  catchLetter: (points: number, position: { x: number; y: number }) => void;
  missLetter: () => void;
  dismissFloater: (id: string) => void;
  setPlaying: (playing: boolean) => void;
  reset: () => void;
}

let floaterIdCounter = 0;

export const useGameStore = create<GameState>((set, get) => ({
  xp: 0,
  combo: 0,
  bestCombo: 0,
  lettersCaught: 0,
  floaters: [],
  isPlaying: false,

  catchLetter: (points, position) => {
    const nextCombo = get().combo + 1;
    const comboMultiplier = 1 + Math.floor(nextCombo / 5) * 0.5; // +50% every 5-streak
    const awarded = Math.round(points * comboMultiplier);

    const floater: XPFloaterEvent = {
      id: `xp-${floaterIdCounter++}`,
      amount: awarded,
      x: position.x,
      y: position.y,
    };

    set((state) => ({
      xp: state.xp + awarded,
      combo: nextCombo,
      bestCombo: Math.max(state.bestCombo, nextCombo),
      lettersCaught: state.lettersCaught + 1,
      floaters: [...state.floaters, floater],
    }));
  },

  missLetter: () => {
    set({ combo: 0 });
  },

  dismissFloater: (id) => {
    set((state) => ({
      floaters: state.floaters.filter((f) => f.id !== id),
    }));
  },

  setPlaying: (playing) => set({ isPlaying: playing }),

  reset: () =>
    set({
      xp: 0,
      combo: 0,
      bestCombo: 0,
      lettersCaught: 0,
      floaters: [],
    }),
}));
