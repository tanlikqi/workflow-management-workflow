import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium border",
  {
    variants: {
      variant: {
        neutral: "bg-white/5 text-ink-muted border-app-border/70",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        danger: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        info: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant, className, dot }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-emerald-400",
            variant === "warning" && "bg-amber-400",
            variant === "danger" && "bg-rose-400",
            variant === "info" && "bg-violet-400",
            (!variant || variant === "neutral") && "bg-ink-muted",
          )}
        />
      )}
      {children}
    </span>
  );
}
