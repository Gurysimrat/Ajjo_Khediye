import { FloatingElement } from "@/components/motion/FloatingElement";

interface CloudProps {
  className?: string;
  /** Scale multiplier for overall size. */
  scale?: number;
  duration?: number;
  delay?: number;
}

/** Soft, hand-drawn felt-cloud silhouette. Purely ambient — aria-hidden. */
export function Cloud({ className, scale = 1, duration = 22, delay = 0 }: CloudProps) {
  return (
    <FloatingElement
      className={className}
      driftX={24}
      driftY={6}
      duration={duration}
      delay={delay}
    >
      <svg
        width={140 * scale}
        height={70 * scale}
        viewBox="0 0 140 70"
        aria-hidden="true"
        className="drop-shadow-sm"
      >
        <ellipse cx="45" cy="42" rx="40" ry="24" fill="var(--color-paper)" opacity="0.9" />
        <ellipse cx="85" cy="35" rx="34" ry="28" fill="var(--color-paper)" opacity="0.9" />
        <ellipse cx="100" cy="48" rx="32" ry="18" fill="var(--color-paper)" opacity="0.9" />
        <ellipse cx="55" cy="50" rx="38" ry="16" fill="var(--color-paper)" opacity="0.9" />
      </svg>
    </FloatingElement>
  );
}
