"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { pressable } from "@/lib/animations/framerVariants";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost" | "marigold" | "leaf";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-terracotta text-paper shadow-[var(--shadow-toy-md)] hover:shadow-[var(--shadow-toy-lg)]",
  secondary:
    "bg-paper text-ink border-2 border-wood-light shadow-[var(--shadow-toy-sm)]",
  ghost: "bg-transparent text-ink hover:bg-cream-deep",
  marigold:
    "bg-marigold text-ink shadow-[var(--shadow-toy-md)] hover:shadow-[var(--shadow-toy-lg)]",
  leaf:
    "bg-leaf text-paper shadow-[var(--shadow-toy-md)] hover:shadow-[var(--shadow-toy-lg)]",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm rounded-[var(--radius-toy-sm)]",
  md: "px-6 py-3 text-base rounded-[var(--radius-toy-md)]",
  lg: "px-8 py-4 text-lg rounded-[var(--radius-toy-md)]",
};

/**
 * Primary interactive control — "wooden toy" button with soft
 * press feedback. Use `variant` to pick a phulkari accent color.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        variants={pressable}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={cn(
          "font-display font-semibold tracking-wide select-none",
          "transition-shadow duration-200",
          "focus-visible:outline-none", // global :focus-visible style handles ring
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
