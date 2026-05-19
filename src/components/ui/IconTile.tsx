import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const gradients = {
  violet: "from-violet-500 to-fuchsia-500",
  pink: "from-pink-500 to-rose-500",
  orange: "from-amber-400 to-orange-500",
  green: "from-emerald-400 to-teal-500",
  red: "from-rose-500 to-red-600",
  blue: "from-sky-400 to-blue-600",
  slate: "from-slate-500 to-slate-700",
} as const;

export type IconTileTone = keyof typeof gradients;

const sizes = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
} as const;

export function IconTile({
  tone = "violet",
  size = "md",
  className,
  children,
}: {
  tone?: IconTileTone;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-white shadow-glow/20 bg-gradient-to-br",
        gradients[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
