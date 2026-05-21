import { Router } from "express";
import { getWorkflow, patchStep } from "../db.js";
import { StepPatchSchema } from "../schemas.js";

export const workflowsRouter = Router();

workflowsRouter.get("/:id", (req, res) => {
  const workflow = getWorkflow(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }
  res.json(workflow);
});

workflowsRouter.patch("/:id/steps/:stepId", (req, res) => {
  const parsed = StepPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
  }
  if (Object.keys(parsed.data).length === 0) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const result = patchStep(req.params.id, req.params.stepId, parsed.data);
  if (result === "WORKFLOW_NOT_FOUND") {
    return res.status(404).json({ error: "Workflow not found" });
  }
  if (result === "STEP_NOT_FOUND") {
    return res.status(404).json({ error: "Step not found" });
  }
  res.json(result.step);
});
