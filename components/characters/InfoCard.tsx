import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

interface InfoCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Labeled content block — used throughout character detail pages. */
export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      {title && (
        <p className="font-display text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
          {title}
        </p>
      )}
      <div className="text-ink-soft text-sm leading-relaxed space-y-2">{children}</div>
    </Card>
  );
}
