"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/state/gameStore";
import { useUserStore } from "@/state/userStore";
import { useAudioStore } from "@/state/audioStore";
import { getRandomLetter } from "@/data/letters";
import { colors } from "@/lib/animations/tokens";
import { soundManager } from "@/components/game/SoundManager";
import {
  createLetter,
  updateLetter,
  type LetterEntityState,
} from "./entities/Letter";
import { createBasket, updateBasket, type BasketState } from "./entities/Basket";
import { checkLetterBasketCollision } from "./collision";
import {
  createParticlePool,
  spawnBurst,
  updateParticles,
  type Particle,
} from "./particles";

interface UseGameLoopOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Called when a milestone combo is reached (drives UdaCallout). */
  onComboMilestone?: (combo: number) => void;
}

const PARTICLE_COLORS = [colors.marigold, colors.leaf, colors.terracotta, colors.woolPink];

const BASE_FALL_SPEED = 90; // px/s
const SPAWN_INTERVAL_BASE = 1.4; // seconds
const LETTER_SIZE = 56;

/**
 * Drives the canvas render loop for the hero letter-catching game.
 * - Mouse/touch X position smoothly moves the basket (horizontal only).
 * - Letters spawn from the top, fall with gravity + sine sway.
 * - AABB collision triggers catches: XP, combo, particle burst, sound.
 * - Difficulty (spawn rate + fall speed) scales with combo streak.
 */
export function useGameLoop({ canvasRef, containerRef, onComboMilestone }: UseGameLoopOptions) {
  const lettersRef = useRef<LetterEntityState[]>([]);
  const basketRef = useRef<BasketState | null>(null);
  const particlesRef = useRef<Particle[]>(createParticlePool());
  const spawnTimerRef = useRef(0);
  const elapsedRef = useRef(0);
  const lastComboMilestoneRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dprRef = useRef(1);

  // Keep store actions in refs to avoid re-subscribing the RAF loop.
  const catchLetter = useGameStore((s) => s.catchLetter);
  const missLetter = useGameStore((s) => s.missLetter);
  const comboRef = useRef(0);

  useEffect(() => {
    const unsub = useGameStore.subscribe((s) => {
      comboRef.current = s.combo;
    });
    return unsub;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dprRef.current = window.devicePixelRatio || 1;
      canvas.width = rect.width * dprRef.current;
      canvas.height = rect.height * dprRef.current;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (!basketRef.current) {
        basketRef.current = createBasket(rect.width, rect.height);
      } else {
        basketRef.current.y = rect.height - basketRef.current.height / 2 - 16;
        basketRef.current.x = Math.min(basketRef.current.x, rect.width);
        basketRef.current.targetX = basketRef.current.x;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // --- Input: horizontal-only cursor tracking ---
    const handlePointerMove = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      if (basketRef.current) {
        basketRef.current.targetX = Math.max(0, Math.min(rect.width, x));
      }
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
    };

    // --- Keyboard accessibility: arrow keys move basket ---
    const KEY_STEP = 24;
    const onKeyDown = (e: KeyboardEvent) => {
      if (!basketRef.current) return;
      const rect = container.getBoundingClientRect();
      if (e.key === "ArrowLeft") {
        basketRef.current.targetX = Math.max(0, basketRef.current.targetX - KEY_STEP);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        basketRef.current.targetX = Math.min(rect.width, basketRef.current.targetX + KEY_STEP);
        e.preventDefault();
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("keydown", onKeyDown);

    // --- Render loop ---
    const render = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // clamp for tab-switch
      lastTimeRef.current = time;
      elapsedRef.current += dt;

      const rect = container.getBoundingClientRect();
      const basket = basketRef.current!;

      // Update basket (smoothed horizontal follow)
      updateBasket(basket, dt);

      // Difficulty scaling from combo
      const combo = comboRef.current;
      const speedMultiplier = 1 + Math.min(combo, 20) * 0.03;
      const spawnInterval = Math.max(0.5, SPAWN_INTERVAL_BASE - Math.min(combo, 20) * 0.04);

      // Spawn letters
      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        const data = getRandomLetter();
        lettersRef.current.push(
          createLetter(data, rect.width, BASE_FALL_SPEED * speedMultiplier, LETTER_SIZE)
        );
      }

      // Update letters, check collisions
      const remaining: LetterEntityState[] = [];
      for (const letter of lettersRef.current) {
        updateLetter(letter, dt, elapsedRef.current);

        if (!letter.caught && checkLetterBasketCollision(letter, basket)) {
          letter.caught = true;
          const muted = useAudioStore.getState().muted;
          const newCombo = comboRef.current + 1;

          catchLetter(letter.data.basePoints, { x: letter.x, y: letter.y });
          useUserStore.getState().markLetterLearned(letter.data.char);
          soundManager.playCatch(comboRef.current, muted);
          spawnBurst(particlesRef.current, letter.x, letter.y, PARTICLE_COLORS);

          if (newCombo > 0 && newCombo % 5 === 0 && newCombo !== lastComboMilestoneRef.current) {
            lastComboMilestoneRef.current = newCombo;
            onComboMilestone?.(newCombo);
          }
          continue; // drop caught letter
        }

        if (letter.y - letter.size / 2 > rect.height) {
          if (!letter.caught) {
            missLetter();
          }
          continue; // drop off-screen letter
        }

        remaining.push(letter);
      }
      lettersRef.current = remaining;

      // Update particles
      updateParticles(particlesRef.current, dt);

      // --- Draw ---
      ctx.save();
      ctx.scale(dprRef.current, dprRef.current);
      ctx.clearRect(0, 0, rect.width, rect.height);

      drawBasket(ctx, basket);
      for (const letter of lettersRef.current) {
        drawLetter(ctx, letter);
      }
      drawParticles(ctx, particlesRef.current);

      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ---- Drawing helpers ----

function resolveColor(ctx: CanvasRenderingContext2D, cssVar: string): string {
  if (!cssVar.startsWith("var(")) return cssVar;
  const varName = cssVar.slice(4, -1).trim();
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return resolved.trim() || "#000";
}

function drawBasket(ctx: CanvasRenderingContext2D, basket: BasketState) {
  const { x, y, width, height } = basket;
  const left = x - width / 2;
  const top = y - height / 2;
  const radius = 14;

  // Basket body (wooden bowl shape)
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, left, top + height * 0.25, width, height * 0.6, radius);
  ctx.fillStyle = resolveColor(ctx, "var(--color-wood)");
  ctx.fill();

  // Rim
  ctx.beginPath();
  ctx.ellipse(x, top + height * 0.25, width / 2, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fillStyle = resolveColor(ctx, "var(--color-wood-light)");
  ctx.fill();

  // Phulkari accent stripe
  ctx.beginPath();
  roundRect(ctx, left + 8, top + height * 0.55, width - 16, 8, 4);
  ctx.fillStyle = resolveColor(ctx, "var(--color-terracotta)");
  ctx.fill();

  ctx.restore();
}

function drawLetter(ctx: CanvasRenderingContext2D, letter: LetterEntityState) {
  ctx.save();
  ctx.translate(letter.x, letter.y);
  ctx.rotate((letter.rotation * Math.PI) / 180);

  // Soft circular tile behind the glyph
  ctx.beginPath();
  ctx.arc(0, 0, letter.size / 2, 0, Math.PI * 2);
  ctx.fillStyle = resolveColor(ctx, "var(--color-paper)");
  ctx.shadowColor = "rgba(139,94,60,0.18)";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Border ring
  ctx.lineWidth = 2;
  ctx.strokeStyle = resolveColor(ctx, "var(--color-marigold-soft)");
  ctx.stroke();

  // Glyph — static Gurmukhi sprite, font-feature-settings default,
  // never morphed/animated as typography (locked rule).
  ctx.fillStyle = resolveColor(ctx, "var(--color-ink)");
  ctx.font = `600 ${letter.size * 0.5}px "Noto Sans Gurmukhi Variable", "Noto Sans Gurmukhi", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter.data.char, 0, 2);

  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    if (!p.active) continue;
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = resolveColor(ctx, p.color);
    ctx.fill();
    ctx.restore();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}
