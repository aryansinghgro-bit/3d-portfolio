import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const actionVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-[0_18px_40px_-16px_var(--accent-shadow)] hover:brightness-110",
        outline:
          "glass text-foreground hover:border-primary/50 hover:bg-primary/[0.08] hover:text-primary",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[0.95rem]",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof actionVariants>;

export function ActionButton({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionLink({
  className,
  variant,
  size,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants) {
  return <a className={cn(actionVariants({ variant, size }), className)} {...props} />;
}
