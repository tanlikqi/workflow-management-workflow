import { Router } from "express";
import { getDashboardMetrics } from "../db.js";

export const metricsRouter = Router();

metricsRouter.get("/dashboard", (_req, res) => {
  res.json(getDashboardMetrics());
});
