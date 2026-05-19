export type FlowKey =
  | "food_delivery"
  | "table_reservation"
  | "payment_processing"
  | "other_flows";

export interface FlowSlice {
  key: FlowKey;
  label: string;
  percent: number;
  count: number;
  trend: number;
  color: string;
}

export const flowsDistribution: FlowSlice[] = [
  { key: "food_delivery",      label: "Food delivery",      percent: 62, count: 87, trend: 19, color: "#7c5cff" },
  { key: "table_reservation",  label: "Table reservation",  percent: 24, count: 18, trend: 7,  color: "#ec4899" },
  { key: "payment_processing", label: "Payment processing", percent: 11, count: 8,  trend: 11, color: "#f59e0b" },
  { key: "other_flows",        label: "Other flows",        percent: 3,  count: 3,  trend: -1, color: "#475569" },
];

export const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const heatmapHours = [9, 10, 11, 12, 13, 14, 15, 16, 17] as const;

export const callHeatmap: number[][] = [
  [3,  4,  5,  4,  3,  1,  0], //  9:00
  [6,  8,  9,  8,  7,  3,  1], // 10:00
  [9,  12, 13, 12, 11, 5,  2], // 11:00
  [10, 14, 16, 15, 13, 6,  3], // 12:00
  [11, 15, 17, 16, 13, 6,  3], // 13:00
  [12, 14, 16, 14, 11, 5,  2], // 14:00
  [9,  11, 12, 11, 9,  3,  1], // 15:00
  [6,  7,  8,  7,  6,  1,  1], // 16:00
  [3,  4,  4,  3,  2,  0,  0], // 17:00
];

export type CallStatus = "success" | "hangup";

export interface ConversationRow {
  id: string;
  flow: string;
  duration: string;
  time: string;
  status: CallStatus;
}

export const lastConversations: ConversationRow[] = [
  { id: "c1", flow: "Payment processing",   duration: "10m 05s", time: "15 min. ago", status: "success" },
  { id: "c2", flow: "Room service request", duration: "5m 15s",  time: "30 min. ago", status: "hangup"  },
  { id: "c3", flow: "Table reservation",    duration: "3m 45s",  time: "hour ago",    status: "success" },
  { id: "c4", flow: "Food delivery",        duration: "2m 02s",  time: "16:03",       status: "success" },
  { id: "c5", flow: "Table reservation",    duration: "8m 30s",  time: "45 min. ago", status: "success" },
  { id: "c6", flow: "Food delivery",        duration: "6m 20s",  time: "20 min. ago", status: "success" },
  { id: "c7", flow: "Food delivery",        duration: "1m 15s",  time: "10 min. ago", status: "hangup"  },
  { id: "c8", flow: "Table reservation",    duration: "12m 50s", time: "2 hours ago", status: "success" },
];

export type CallsHandledRange = "today" | "yesterday" | "this_week";

export interface CallsPoint {
  hour: string;
  successful: number;
  transferred: number;
}

function buildCallsCurve(seed: number): CallsPoint[] {
  return Array.from({ length: 25 }, (_, h) => {
    const base = 10 + 5 * Math.sin((h - 6) / 3.5) + 2 * Math.cos(h / 2);
    const successful = Math.max(0, Math.round(base + seed * 1.4));
    const transferred = Math.max(0, Math.round(1 + Math.sin(h / 2.5) + seed * 0.3));
    return { hour: `${h}:00`, successful, transferred };
  });
}

export const callsHandledSeries: Record<CallsHandledRange, CallsPoint[]> = {
  today: buildCallsCurve(2),
  yesterday: buildCallsCurve(0),
  this_week: buildCallsCurve(-1),
};

export const callsHandledTotals: Record<CallsHandledRange, number> = {
  today: 143,
  yesterday: 128,
  this_week: 967,
};

export type DurationRange = "this_week" | "last_week" | "two_weeks_ago";

export interface DurationBar {
  day: string;
  hours: number;
}

export const totalDurationSeries: Record<DurationRange, DurationBar[]> = {
  this_week: [
    { day: "Sat", hours: 6 },
    { day: "Sun", hours: 8 },
    { day: "Mon", hours: 10 },
    { day: "Tue", hours: 14 },
    { day: "Wed", hours: 22 },
    { day: "Thu", hours: 11 },
    { day: "Fri", hours: 9 },
  ],
  last_week: [
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 6 },
    { day: "Mon", hours: 12 },
    { day: "Tue", hours: 16 },
    { day: "Wed", hours: 18 },
    { day: "Thu", hours: 13 },
    { day: "Fri", hours: 7 },
  ],
  two_weeks_ago: [
    { day: "Sat", hours: 3 },
    { day: "Sun", hours: 5 },
    { day: "Mon", hours: 9 },
    { day: "Tue", hours: 11 },
    { day: "Wed", hours: 15 },
    { day: "Thu", hours: 10 },
    { day: "Fri", hours: 8 },
  ],
};

export const totalDurationTotal: Record<DurationRange, number> = {
  this_week: 98,
  last_week: 76,
  two_weeks_ago: 61,
};

export const dashboardUser = {
  name: "Tasha Dervin",
  email: "t.dervin@revolab.ai",
  initials: "TD",
};
