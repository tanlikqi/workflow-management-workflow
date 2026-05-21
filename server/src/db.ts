import type {
  CallRecord,
  StepPatch,
  Workflow,
} from "./schemas.js";

const defaultWorkflow: Workflow = {
  id: "incoming-call-routing",
  name: "Incoming Call Routing",
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-19T11:00:00.000Z",
  nodes: [
    {
      id: "incoming-call-initiated",
      type: "trigger",
      position: { x: 320, y: 0 },
      data: {
        kind: "trigger",
        title: "Incoming Call Initiated",
        description: "",
        tone: "violet",
        iconKey: "flag",
        likes: 0,
        dislikes: 0,
      },
    },
    {
      id: "call-qualification",
      type: "step",
      position: { x: 80, y: 180 },
      data: {
        kind: "step",
        title: "Call Qualification",
        description: "Identify caller intent and basic business details.",
        tone: "violet",
        iconKey: "phone",
        likes: 2,
        dislikes: 2,
        primaryOutcome: { label: "Caller is eligible", iconKey: "check" },
        secondaryOutcome: { label: "Caller is ineligible", iconKey: "alert" },
      },
    },
    {
      id: "process-valid-call",
      type: "step",
      position: { x: 360, y: 180 },
      data: {
        kind: "step",
        title: "Process Valid Call",
        description: "Route to appropriate service flow.",
        tone: "orange",
        iconKey: "check-square",
        likes: 3,
        dislikes: 2,
        primaryOutcome: { label: "Handed off to service flow", iconKey: "check" },
        secondaryOutcome: { label: "Escalate to human agent", iconKey: "users" },
      },
    },
    {
      id: "handle-ineligible-caller",
      type: "step",
      position: { x: 360, y: 380 },
      data: {
        kind: "step",
        title: "Handle Ineligible Caller",
        description: "Explain ineligibility and provide guidance.",
        tone: "pink",
        iconKey: "clock",
        likes: 1,
        dislikes: 2,
        primaryOutcome: { label: "Politely decline and close the call", iconKey: "phone-off" },
        secondaryOutcome: { label: "Escalate to human agent", iconKey: "users" },
      },
    },
    {
      id: "route-to-human",
      type: "step",
      position: { x: 80, y: 580 },
      data: {
        kind: "step",
        title: "Route to Human",
        description: "Transfer caller to available human agent.",
        tone: "green",
        iconKey: "users",
        likes: 2,
        dislikes: 1,
        primaryOutcome: { label: "Caller connected to human agent", iconKey: "check" },
      },
    },
    {
      id: "close-call",
      type: "step",
      position: { x: 620, y: 580 },
      data: {
        kind: "step",
        title: "Close Call",
        description: "Politely decline and terminate the call.",
        tone: "red",
        iconKey: "phone-off",
        likes: 0,
        dislikes: 0,
        primaryOutcome: { label: "Call ended", iconKey: "phone-off" },
      },
    },
  ],
  edges: [
    { id: "e_start_to_qualification",        source: "incoming-call-initiated", target: "call-qualification",      type: "smoothstep", style: { stroke: "#7c5cff", strokeWidth: 1.5 } },
    { id: "e_qualification_to_valid",        source: "call-qualification",      target: "process-valid-call",      type: "smoothstep", style: { stroke: "#10b981", strokeWidth: 1.5 } },
    { id: "e_qualification_to_ineligible",   source: "call-qualification",      target: "handle-ineligible-caller", type: "smoothstep", style: { stroke: "#ec4899", strokeWidth: 1.5, strokeDasharray: "5 5" } },
    { id: "e_valid_to_human",                source: "process-valid-call",      target: "route-to-human",          type: "smoothstep", style: { stroke: "#10b981", strokeWidth: 1.5, strokeDasharray: "5 5" } },
    { id: "e_ineligible_to_human",           source: "handle-ineligible-caller", target: "route-to-human",          type: "smoothstep", style: { stroke: "#10b981", strokeWidth: 1.5, strokeDasharray: "5 5" } },
    { id: "e_ineligible_to_close",           source: "handle-ineligible-caller", target: "close-call",              type: "smoothstep", style: { stroke: "#ef4444", strokeWidth: 1.5, strokeDasharray: "5 5" } },
  ],
};

const workflows = new Map<string, Workflow>([[defaultWorkflow.id, defaultWorkflow]]);

const callRecords: CallRecord[] = [
  { id: "c1", flow: "Payment processing",   duration: "10m 05s", time: "15 min. ago", status: "success" },
  { id: "c2", flow: "Room service request", duration: "5m 15s",  time: "30 min. ago", status: "hangup"  },
  { id: "c3", flow: "Table reservation",    duration: "3m 45s",  time: "hour ago",    status: "success" },
  { id: "c4", flow: "Food delivery",        duration: "2m 02s",  time: "16:03",       status: "success" },
  { id: "c5", flow: "Table reservation",    duration: "8m 30s",  time: "45 min. ago", status: "success" },
  { id: "c6", flow: "Food delivery",        duration: "6m 20s",  time: "20 min. ago", status: "success" },
  { id: "c7", flow: "Food delivery",        duration: "1m 15s",  time: "10 min. ago", status: "hangup"  },
  { id: "c8", flow: "Table reservation",    duration: "12m 50s", time: "2 hours ago", status: "success" },
];

const flowsDistribution = [
  { key: "food_delivery",      label: "Food delivery",      percent: 62, count: 87, trend: 19, color: "#7c5cff" },
  { key: "table_reservation",  label: "Table reservation",  percent: 24, count: 18, trend: 7,  color: "#ec4899" },
  { key: "payment_processing", label: "Payment processing", percent: 11, count: 8,  trend: 11, color: "#f59e0b" },
  { key: "other_flows",        label: "Other flows",        percent: 3,  count: 3,  trend: -1, color: "#475569" },
];

const callHeatmap = [
  [3,  4,  5,  4,  3,  1,  0],
  [6,  8,  9,  8,  7,  3,  1],
  [9,  12, 13, 12, 11, 5,  2],
  [10, 14, 16, 15, 13, 6,  3],
  [11, 15, 17, 16, 13, 6,  3],
  [12, 14, 16, 14, 11, 5,  2],
  [9,  11, 12, 11, 9,  3,  1],
  [6,  7,  8,  7,  6,  1,  1],
  [3,  4,  4,  3,  2,  0,  0],
];

function buildCallsCurve(seed: number) {
  return Array.from({ length: 25 }, (_, h) => {
    const base = 10 + 5 * Math.sin((h - 6) / 3.5) + 2 * Math.cos(h / 2);
    const successful = Math.max(0, Math.round(base + seed * 1.4));
    const transferred = Math.max(0, Math.round(1 + Math.sin(h / 2.5) + seed * 0.3));
    return { hour: `${h}:00`, successful, transferred };
  });
}

const callsHandledSeries = {
  today: buildCallsCurve(2),
  yesterday: buildCallsCurve(0),
  this_week: buildCallsCurve(-1),
};

const totalDurationSeries = {
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

const sumCalls = (series: { successful: number; transferred: number }[]) =>
  series.reduce((acc, p) => acc + p.successful + p.transferred, 0);

const sumHours = (series: { hours: number }[]) =>
  series.reduce((acc, b) => acc + b.hours, 0);

const callsHandledTotals = {
  today: sumCalls(callsHandledSeries.today),
  yesterday: sumCalls(callsHandledSeries.yesterday),
  this_week: sumCalls(callsHandledSeries.this_week),
};

const totalDurationTotal = {
  this_week: sumHours(totalDurationSeries.this_week),
  last_week: sumHours(totalDurationSeries.last_week),
  two_weeks_ago: sumHours(totalDurationSeries.two_weeks_ago),
};

export function getWorkflow(id: string): Workflow | undefined {
  return workflows.get(id);
}

export function patchStep(
  workflowId: string,
  stepId: string,
  patch: StepPatch,
): { workflow: Workflow; step: Workflow["nodes"][number] } | "WORKFLOW_NOT_FOUND" | "STEP_NOT_FOUND" {
  const workflow = workflows.get(workflowId);
  if (!workflow) return "WORKFLOW_NOT_FOUND";

  const nodeIndex = workflow.nodes.findIndex((n) => n.id === stepId);
  if (nodeIndex === -1) return "STEP_NOT_FOUND";

  const existing = workflow.nodes[nodeIndex];
  const updatedNode = {
    ...existing,
    data: { ...existing.data, ...patch },
  };

  const updatedWorkflow: Workflow = {
    ...workflow,
    nodes: workflow.nodes.map((n, i) => (i === nodeIndex ? updatedNode : n)),
    updatedAt: new Date().toISOString(),
  };

  workflows.set(workflowId, updatedWorkflow);
  return { workflow: updatedWorkflow, step: updatedNode };
}

export function listCalls(filter: { limit?: number; status?: "success" | "hangup" }): CallRecord[] {
  let rows = callRecords;
  if (filter.status) rows = rows.filter((r) => r.status === filter.status);
  if (filter.limit) rows = rows.slice(0, filter.limit);
  return rows;
}

export function getDashboardMetrics() {
  return {
    flowsDistribution,
    callHeatmap,
    lastConversations: callRecords,
    callsHandledTotals,
    callsHandledSeries,
    totalDurationTotal,
    totalDurationSeries,
  };
}
