import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { flowsDistribution } from "@/data/mock";

const ranges = [
  { value: "this_week", label: "Week · 12–19 Jul 2025" },
  { value: "last_week", label: "Week · 5–11 Jul 2025" },
  { value: "month",     label: "Month · Jul 2025" },
] as const;

type Range = (typeof ranges)[number]["value"];

export function FlowsDistribution() {
  const [range, setRange] = useState<Range>("this_week");

  const slices = useMemo(() => {
    return flowsDistribution.map((s, i) => ({
      ...s,
      percent:
        range === "this_week"
          ? s.percent
          : range === "last_week"
            ? Math.max(1, s.percent + (i % 2 === 0 ? -2 : 2))
            : Math.max(1, s.percent + (i % 2 === 0 ? 3 : -3)),
    }));
  }, [range]);

  return (
    <Card className="h-full">
      <CardHeader
        title="Flows distribution"
        action={
          <Select
            value={range}
            options={ranges as unknown as { value: Range; label: string }[]}
            onChange={setRange}
            leadingIcon={<Calendar className="h-3.5 w-3.5" />}
          />
        }
      />

      <div className="grid grid-cols-[140px_1fr] items-center gap-6">
        <div className="relative h-[140px] w-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="percent"
                innerRadius={48}
                outerRadius={66}
                paddingAngle={2}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {slices.map((s) => (
                  <Cell key={s.key} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col gap-2.5">
          {slices.map((s) => (
            <li key={s.key} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-ink">{s.label}</span>
              </div>
              <span className="tabular-nums font-medium" style={{ color: s.color }}>
                {s.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
