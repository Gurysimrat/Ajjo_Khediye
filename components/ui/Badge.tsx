import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "marigold" | "leaf" | "terracotta" | "navy";
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  marigold: "bg-marigold-soft text-ink",
  leaf: "bg-leaf-soft text-ink",
  terracotta: "bg-terracotta-soft text-ink",
  navy: "bg-navy-soft text-paper",
};

/** Small pill label — used for XP counters, combo tags, achievement chips. */
export function Badge({ className, tone = "marigold", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-toy-pill)]",
        "font-display text-sm font-semibold",
        toneStyles[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
