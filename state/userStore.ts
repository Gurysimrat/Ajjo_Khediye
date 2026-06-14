import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  /** Lifetime XP across sessions (future: synced with backend/Supabase). */
  totalXp: number;
  /** Letters the visitor has "learned" (caught at least once). */
  lettersLearned: string[];
  /** Locale preference — extensible for future multilingual UI. */
  locale: "en" | "pa";

  addXp: (amount: number) => void;
  markLetterLearned: (letter: string) => void;
  setLocale: (locale: "en" | "pa") => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      totalXp: 0,
      lettersLearned: [],
      locale: "en",

      addXp: (amount) => set({ totalXp: get().totalXp + amount }),

      markLetterLearned: (letter) => {
        if (!get().lettersLearned.includes(letter)) {
          set({ lettersLearned: [...get().lettersLearned, letter] });
        }
      },

      setLocale: (locale) => set({ locale }),
    }),
    { name: "ajjo-user-progress" }
  )
);
