import type { GurmukhiLetter } from "@/data/letters";

export interface LetterEntityState {
  id: number;
  data: GurmukhiLetter;
  x: number; // center x, px
  y: number; // center y, px
  vy: number; // fall speed, px/s
  rotation: number; // degrees
  rotationSpeed: number; // deg/s
  swayPhase: number; // for sine drift
  swayAmplitude: number;
  size: number; // bounding box side, px
  caught: boolean;
  missed: boolean;
}

let letterIdCounter = 0;

/** Factory for a new falling letter at the top of the canvas. */
export function createLetter(
  data: GurmukhiLetter,
  canvasWidth: number,
  baseSpeed: number,
  size: number
): LetterEntityState {
  return {
    id: letterIdCounter++,
    data,
    x: Math.random() * (canvasWidth - size) + size / 2,
    y: -size,
    vy: baseSpeed * (0.85 + Math.random() * 0.3),
    rotation: Math.random() * 20 - 10,
    rotationSpeed: (Math.random() - 0.5) * 20,
    swayPhase: Math.random() * Math.PI * 2,
    swayAmplitude: 18 + Math.random() * 14,
    size,
    caught: false,
    missed: false,
  };
}

/** Updates a letter's position for one frame. dt in seconds. */
export function updateLetter(letter: LetterEntityState, dt: number, elapsed: number) {
  letter.y += letter.vy * dt;
  letter.x += Math.sin(elapsed * 1.5 + letter.swayPhase) * letter.swayAmplitude * dt;
  letter.rotation += letter.rotationSpeed * dt;
}
