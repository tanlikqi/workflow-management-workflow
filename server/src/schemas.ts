import { z } from "zod";

export const StepKindSchema = z.enum(["trigger", "step"]);

export const IconToneSchema = z.enum([
  "violet",
  "pink",
  "orange",
  "green",
  "red",
  "blue",
  "slate",
]);

export const OutcomeSchema = z.object({
  label: z.string().min(1).max(120),
  iconKey: z.string().min(1),
});

export const StepNodeDataSchema = z.object({
  kind: StepKindSchema,
  title: z.string().min(1).max(80),
  description: z.string().max(500),
  tone: IconToneSchema,
  iconKey: z.string().min(1),
  primaryOutcome: OutcomeSchema.optional(),
  secondaryOutcome: OutcomeSchema.optional(),
  likes: z.number().int().min(0),
  dislikes: z.number().int().min(0),
});

export const StepNodeSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["trigger", "step"]),
  position: z.object({ x: z.number(), y: z.number() }),
  data: StepNodeDataSchema,
});

export const EdgeStyleSchema = z.object({
  stroke: z.string().optional(),
  strokeWidth: z.number().optional(),
  strokeDasharray: z.string().optional(),
});

export const EdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.string().default("smoothstep"),
  style: EdgeStyleSchema.optional(),
});

export const WorkflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  nodes: z.array(StepNodeSchema),
  edges: z.array(EdgeSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const StepPatchSchema = z
  .object({
    title: z.string().min(1).max(80),
    description: z.string().max(500),
    primaryOutcome: OutcomeSchema,
    secondaryOutcome: OutcomeSchema,
  })
  .partial();

export const CallRecordSchema = z.object({
  id: z.string().min(1),
  flow: z.string().min(1),
  duration: z.string().min(1),
  time: z.string().min(1),
  status: z.enum(["success", "hangup"]),
});

export type StepKind = z.infer<typeof StepKindSchema>;
export type IconTone = z.infer<typeof IconToneSchema>;
export type Outcome = z.infer<typeof OutcomeSchema>;
export type StepNodeData = z.infer<typeof StepNodeDataSchema>;
export type StepNode = z.infer<typeof StepNodeSchema>;
export type Edge = z.infer<typeof EdgeSchema>;
export type Workflow = z.infer<typeof WorkflowSchema>;
export type StepPatch = z.infer<typeof StepPatchSchema>;
export type CallRecord = z.infer<typeof CallRecordSchema>;
