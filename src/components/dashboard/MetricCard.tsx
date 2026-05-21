import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface MetricCardProps {
  label: string;
  count: number;
  trend: number;
  unit?: string;
  comparison?: string;
}

export function MetricCardSkeleton({ label }: { label?: string }) {
  return (
    <Card className="p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label ?? <span className="inline-block h-3 w-24 animate-pulse rounded bg-white/5" />}
      </div>
      <div className="mt-3">
        <span className="inline-block h-8 w-16 animate-pulse rounded bg-white/5" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-block h-4 w-12 animate-pulse rounded bg-white/5" />
        <span className="inline-block h-3 w-16 animate-pulse rounded bg-white/5" />
      </div>
    </Card>
  );
}

export function MetricCard({
  label,
  count,
  trend,
  unit = "calls",
  comparison = "vs last week",
}: MetricCardProps) {
  const positive = trend >= 0;
  return (
    <Card className="p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
          {count}
        </span>
        <span className="text-sm text-ink-muted">{unit}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-medium tabular-nums",
            positive
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-rose-500/30 bg-rose-500/10 text-rose-400",
          )}
        >
          {positive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {positive ? "+" : ""}
          {trend}%
        </span>
        <span className="text-ink-dim">{comparison}</span>
      </div>
    </Card>
  );
}
