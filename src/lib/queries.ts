import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type {
  CallsHandledRange,
  CallsPoint,
  ConversationRow,
  DurationBar,
  DurationRange,
  FlowSlice,
} from "@/data/mock";

export interface DashboardMetrics {
  flowsDistribution: FlowSlice[];
  callHeatmap: number[][];
  lastConversations: ConversationRow[];
  callsHandledTotals: Record<CallsHandledRange, number>;
  callsHandledSeries: Record<CallsHandledRange, CallsPoint[]>;
  totalDurationTotal: Record<DurationRange, number>;
  totalDurationSeries: Record<DurationRange, DurationBar[]>;
}

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ["dashboard-metrics"],
    queryFn: () => apiFetch<DashboardMetrics>("/api/metrics/dashboard"),
  });
}
