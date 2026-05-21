import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { heatmapDays, heatmapHours } from "@/data/mock";
import { useDashboardMetrics } from "@/lib/queries";

const ranges = [
  { value: "jun_jul", label: "Month · Jun–Jul 2025" },
  { value: "jul_aug", label: "Month · Jul–Aug 2025" },
] as const;

type Range = (typeof ranges)[number]["value"];

function cellStyle(value: number, range: Range, max: number): { background: string; border: string } {
  const factor = range === "jun_jul" ? 1 : 0.8;
  const intensity = max === 0 ? 0 : Math.min(1, (value / max) * factor);
  const alpha = 0.08 + intensity * 0.55;
  return {
    background: `rgba(124, 92, 255, ${alpha.toFixed(3)})`,
    border: `1px solid rgba(124, 92, 255, ${(alpha + 0.06).toFixed(3)})`,
  };
}

export function CallDistribution() {
  const [range, setRange] = useState<Range>("jun_jul");
  const { data, isLoading, isError } = useDashboardMetrics();

  const heatmap = data?.callHeatmap ?? [];
  const max = useMemo(() => (heatmap.length ? Math.max(...heatmap.flat()) : 0), [heatmap]);

  return (
    <Card className="h-full">
      <CardHeader
        title="Call distribution"
        action={
          <Select
            value={range}
            options={ranges as unknown as { value: Range; label: string }[]}
            onChange={setRange}
            leadingIcon={<Calendar className="h-3.5 w-3.5" />}
          />
        }
      />

      {isError && (
        <div className="text-xs text-rose-300">Couldn't load heatmap.</div>
      )}

      {!isError && (
        <div className="grid grid-cols-[44px_1fr] gap-x-2 text-[11px] text-ink-muted">
          <div />
          <div className="grid grid-cols-7 gap-1.5 pb-2">
            {heatmapDays.map((d) => (
              <div key={d} className="text-center tracking-wide">{d}</div>
            ))}
          </div>

          {heatmapHours.map((hour, hIdx) => (
            <div key={hour} className="contents">
              <div className="flex h-7 items-center justify-end pr-2 tabular-nums">
                {hour}:00
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {heatmapDays.map((_, dIdx) => {
                  const value = heatmap[hIdx]?.[dIdx] ?? 0;
                  return (
                    <div
                      key={dIdx}
                      title={isLoading ? "Loading…" : `${value} calls`}
                      className={isLoading ? "h-7 animate-pulse rounded-md bg-white/5" : "h-7 rounded-md"}
                      style={isLoading ? undefined : cellStyle(value, range, max)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
