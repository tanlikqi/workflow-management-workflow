import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { useDashboardMetrics } from "@/lib/queries";
import type { DurationRange } from "@/data/mock";
import { cn } from "@/lib/cn";

const ranges = [
  { value: "this_week",     label: "Week · 12–19 Jul" },
  { value: "last_week",     label: "Week · 5–11 Jul" },
  { value: "two_weeks_ago", label: "Week · 28 Jun–4 Jul" },
] as const;

const DAY_LABELS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export function TotalDuration() {
  const [range, setRange] = useState<DurationRange>("this_week");
  const { data, isLoading, isError } = useDashboardMetrics();

  const series = data?.totalDurationSeries[range] ?? [];
  const total = data?.totalDurationTotal[range] ?? 0;
  const max = series.length ? Math.max(...series.map((d) => d.hours)) : 1;
  const peakIdx = series.findIndex((d) => d.hours === max);

  return (
    <Card className="h-full">
      <CardHeader
        title="Total duration"
        action={
          <Select
            value={range}
            options={ranges as unknown as { value: DurationRange; label: string }[]}
            onChange={setRange}
            leadingIcon={<Calendar className="h-3.5 w-3.5" />}
          />
        }
      />

      <div className="flex items-baseline gap-1.5">
        {isLoading ? (
          <span className="inline-block h-10 w-20 animate-pulse rounded bg-white/5" />
        ) : (
          <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
            {total}
          </span>
        )}
        <span className="text-lg text-ink-muted">h</span>
      </div>
      <div className="mt-1 text-xs text-ink-muted">total this week</div>

      {isError ? (
        <div className="mt-6 text-xs text-rose-300">Couldn't load duration.</div>
      ) : (
        <div className="mt-6 grid grid-cols-7 gap-3">
          {(isLoading ? DAY_LABELS.map((day) => ({ day, hours: 0 })) : series).map((d, i) => {
            const h = max > 0 ? Math.max(0.06, d.hours / max) : 0.06;
            const isPeak = !isLoading && i === peakIdx;
            return (
              <div key={d.day} className="flex flex-col items-center gap-2">
                <div className="flex h-[110px] w-full items-end">
                  <div
                    className={cn(
                      "w-full rounded-md transition",
                      isLoading
                        ? "animate-pulse bg-white/5"
                        : isPeak
                          ? "bg-gradient-to-t from-brand-violet to-brand-purple shadow-glow"
                          : "bg-violet-500/15 border border-violet-500/20",
                    )}
                    style={{ height: isLoading ? "60%" : `${h * 100}%` }}
                    title={isLoading ? "Loading…" : `${d.hours}h`}
                  />
                </div>
                <span
                  className={cn(
                    "text-[11px]",
                    isPeak ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
