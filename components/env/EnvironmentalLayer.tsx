import { Cloud } from "@/components/env/Cloud";
import { Bird } from "@/components/env/Bird";
import { Butterfly } from "@/components/env/Butterfly";
import { Kite } from "@/components/env/Kite";

/**
 * Ambient background layer for the hero. Sits behind the game canvas
 * (z-index lower than GameCanvas, above the sky gradient). Purely
 * decorative — every element is aria-hidden via its own SVG.
 *
 * Background motion stays within small translation/scale ranges per
 * motion guidelines, and is fully disabled under prefers-reduced-motion
 * (handled inside each element via FloatingElement/useReducedMotion).
 */
export function EnvironmentalLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Clouds — slow horizontal drift, varying depths */}
      <Cloud className="absolute top-[8%] left-[6%]" scale={1.1} duration={26} />
      <Cloud className="absolute top-[16%] left-[55%]" scale={0.8} duration={32} delay={4} />
      <Cloud className="absolute top-[5%] left-[78%]" scale={1.3} duration={28} delay={2} />

      {/* Kites — bottom corners, gentle sway */}
      <Kite
        className="absolute bottom-[12%] left-[8%]"
        color="var(--color-marigold)"
        scale={1}
        duration={7}
      />
      <Kite
        className="absolute top-[14%] right-[10%]"
        color="var(--color-leaf)"
        scale={0.8}
        duration={9}
        delay={1.5}
      />

      {/* Birds — mid-air flight loops */}
      <Bird className="absolute top-[22%] left-[20%]" scale={1.2} duration={20} />
      <Bird className="absolute top-[30%] left-[40%]" scale={0.9} duration={24} delay={3} />
      <Bird className="absolute top-[18%] right-[28%]" scale={1} duration={22} delay={6} />

      {/* Butterflies — lower, closer to the player's view */}
      <Butterfly className="absolute bottom-[20%] left-[15%]" scale={1.1} duration={11} />
      <Butterfly
        className="absolute bottom-[28%] right-[18%]"
        scale={0.9}
        color="var(--color-leaf-soft)"
        duration={9}
        delay={2}
      />
    </div>
  );
}
