import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply the subtle felt/paper grain texture overlay. */
  textured?: boolean;
}

/**
 * Base content container — soft rounded "toy" card with warm shadow.
 * Compose with motion wrappers (e.g. RevealOnScroll) for entrance animation.
 */
export function Card({ className, textured, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-paper rounded-[var(--radius-toy-lg)] shadow-[var(--shadow-toy-md)]",
        "p-6 sm:p-8",
        textured && "bg-grain",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
