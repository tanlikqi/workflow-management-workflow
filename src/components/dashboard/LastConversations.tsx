import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import type { CallStatus, ConversationRow } from "@/data/mock";

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
  const { data, isLoading, isError, refetch } = useQuery<ConversationRow[]>({
    queryKey: ["calls"],
    queryFn: () => apiFetch<ConversationRow[]>("/api/calls"),
  });

  const all = data ?? [];
  const rows = expanded ? all : all.slice(0, INITIAL);

  return (
    <Card className="h-full">
      <CardHeader
        title="Last conversations"
        action={
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-brand-violet hover:text-violet-300 transition disabled:opacity-50"
            disabled={isLoading || isError || all.length <= INITIAL}
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

      {isLoading && (
        <ul className="mt-2 divide-y divide-app-border/40">
          {Array.from({ length: INITIAL }).map((_, i) => (
            <li key={i} className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.7fr] items-center gap-x-4 py-3">
              <span className="h-3 w-32 animate-pulse rounded bg-white/5" />
              <span className="h-3 w-16 animate-pulse rounded bg-white/5" />
              <span className="h-3 w-20 animate-pulse rounded bg-white/5" />
              <span className="h-3 w-14 animate-pulse rounded bg-white/5" />
            </li>
          ))}
        </ul>
      )}

      {isError && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-xs">
          <span className="text-rose-300">Couldn't load conversations.</span>
          <button
            onClick={() => refetch()}
            className="text-rose-200 hover:text-white transition"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <ul className="mt-2 divide-y divide-app-border/40">
          {rows.map((r) => (
            <li
              key={r.id}
              className="-mx-2 grid grid-cols-[1.4fr_0.8fr_0.9fr_0.7fr] items-center gap-x-4 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-white/[0.03]"
            >
              <span className="text-ink">{r.flow}</span>
              <span className="text-ink-muted tabular-nums">{r.duration}</span>
              <span className="text-ink-muted">{r.time}</span>
              <span><StatusBadge status={r.status} /></span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
