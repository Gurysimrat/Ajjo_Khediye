"use client";

import { useRef } from "react";
import { useGameLoop } from "./useGameLoop";

interface GameCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onComboMilestone?: (combo: number) => void;
}

/**
 * The canvas surface for the hero letter-catching game. Renders the
 * basket, falling letters, and particle bursts via requestAnimationFrame.
 * Keyboard-focusable for accessibility (arrow keys move the basket).
 */
export function GameCanvas({ containerRef, onComboMilestone }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGameLoop({ canvasRef, containerRef, onComboMilestone });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-none touch-none"
      role="application"
      aria-label="Letter catching game. Move the basket left and right with your mouse, touch, or arrow keys to catch falling Punjabi letters."
      tabIndex={0}
    />
  );
}
