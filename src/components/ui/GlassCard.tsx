import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/** Glassmorphism surface used across every section. */
export function GlassCard({
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-[0_24px_60px_-30px_var(--accent-shadow)]",
        className,
      )}
      {...props}
    />
  );
}
