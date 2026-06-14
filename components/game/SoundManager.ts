"use client";

/**
 * Lightweight sound trigger manager using the Web Audio API for
 * synthesized "soft chime" tones — avoids needing audio file assets
 * for the MVP. Replace tone() internals with sample playback later
 * by swapping the implementation; the public API stays the same.
 *
 * Respects the audioStore `muted` flag — callers should check it
 * before calling, or pass `muted` directly.
 */
export class SoundManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  /** Resumes the audio context — call on first user interaction (autoplay policy). */
  resume() {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
  }

  /** Plays a soft, short chime. Pitch rises slightly with combo level. */
  playCatch(comboLevel: number, muted: boolean) {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const baseFreq = 523.25; // C5
    const freq = baseFreq * Math.pow(2, Math.min(comboLevel, 8) / 24); // gentle pitch climb

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  /** Plays a gentle "whoosh/miss" tone — lower, softer than a catch chime. */
  playMiss(muted: boolean) {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }
}

export const soundManager = new SoundManager();
