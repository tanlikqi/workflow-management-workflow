import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import {
  callsHandledSeries,
  callsHandledTotals,
  type CallsHandledRange,
} from "@/data/mock";

const ranges = [
  { value: "today",     label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this_week", label: "This week" },
] as const;

export function CallsHandled() {
  const [range, setRange] = useState<CallsHandledRange>("today");
  const data = callsHandledSeries[range];
  const total = callsHandledTotals[range];

  return (
    <Card className="h-full">
      <CardHeader
        title="Calls handled"
        action={
          <Select
            value={range}
            options={ranges as unknown as { value: CallsHandledRange; label: string }[]}
            onChange={setRange}
          />
        }
      />

      <div className="grid grid-cols-[160px_1fr] items-end gap-6">
        <div>
          <div className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
            {total}
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {range === "today" ? "calls today" : range === "yesterday" ? "calls yesterday" : "calls this week"}
          </div>
          <ul className="mt-4 space-y-1.5 text-xs">
            <li className="flex items-center gap-2 text-ink">
              <span className="h-2 w-2 rounded-full bg-brand-violet" />
              Successful
            </li>
            <li className="flex items-center gap-2 text-ink">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Transferred
            </li>
          </ul>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#23263d" vertical={false} />
              <XAxis
                dataKey="hour"
                stroke="#5d6080"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                stroke="#5d6080"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: "#12152a",
                  border: "1px solid #23263d",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#e6e7f0",
                }}
                cursor={{ stroke: "#7c5cff", strokeOpacity: 0.3 }}
              />
              <Line
                type="monotone"
                dataKey="successful"
                stroke="#7c5cff"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: "#7c5cff" }}
              />
              <Line
                type="monotone"
                dataKey="transferred"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{ r: 3, fill: "#f59e0b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
