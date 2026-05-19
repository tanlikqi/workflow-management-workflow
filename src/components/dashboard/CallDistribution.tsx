import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { callHeatmap, heatmapDays, heatmapHours } from "@/data/mock";

const ranges = [
  { value: "jun_jul", label: "Month · Jun–Jul 2025" },
  { value: "jul_aug", label: "Month · Jul–Aug 2025" },
] as const;

type Range = (typeof ranges)[number]["value"];

const MAX = Math.max(...callHeatmap.flat());

function cellStyle(value: number, range: Range): { background: string; border: string } {
  const factor = range === "jun_jul" ? 1 : 0.8;
  const intensity = Math.min(1, (value / MAX) * factor);
  const alpha = 0.08 + intensity * 0.55;
  return {
    background: `rgba(124, 92, 255, ${alpha.toFixed(3)})`,
    border: `1px solid rgba(124, 92, 255, ${(alpha + 0.06).toFixed(3)})`,
  };
}

export function CallDistribution() {
  const [range, setRange] = useState<Range>("jun_jul");

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
                const value = callHeatmap[hIdx][dIdx];
                return (
                  <div
                    key={dIdx}
                    title={`${value} calls`}
                    className="h-7 rounded-md"
                    style={cellStyle(value, range)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
