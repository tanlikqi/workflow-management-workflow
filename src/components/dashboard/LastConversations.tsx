import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { lastConversations, type CallStatus } from "@/data/mock";

const INITIAL = 5;

function StatusBadge({ status }: { status: CallStatus }) {
  return status === "success" ? (
    <Badge variant="success" dot>Success</Badge>
  ) : (
    <Badge variant="warning" dot>Hang Up</Badge>
  );
}

export function LastConversations() {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? lastConversations : lastConversations.slice(0, INITIAL);

  return (
    <Card className="h-full">
      <CardHeader
        title="Last conversations"
        action={
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-brand-violet hover:text-violet-300 transition"
          >
            {expanded ? "Show less" : "Show more"}
            <ArrowRight className="h-3 w-3" />
          </button>
        }
      />

      <div className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.7fr] gap-x-4 text-[11px] uppercase tracking-[0.12em] text-ink-dim">
        <span>Flow</span>
        <span>Duration</span>
        <span>Time</span>
        <span>Status</span>
      </div>

      <ul className="mt-2 divide-y divide-app-border/40">
        {rows.map((r) => (
          <li
            key={r.id}
            className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.7fr] items-center gap-x-4 py-2.5 text-sm"
          >
            <span className="text-ink">{r.flow}</span>
            <span className="text-ink-muted tabular-nums">{r.duration}</span>
            <span className="text-ink-muted">{r.time}</span>
            <span><StatusBadge status={r.status} /></span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
