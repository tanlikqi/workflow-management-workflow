import express from "express";
import cors from "cors";
import { workflowsRouter } from "./routes/workflows.js";
import { metricsRouter } from "./routes/metrics.js";
import { callsRouter } from "./routes/calls.js";

const PORT = Number(process.env.PORT ?? 3001);

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/workflows", workflowsRouter);
app.use("/api/metrics", metricsRouter);
app.use("/api/calls", callsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`[revolab-api] listening on http://localhost:${PORT}`);
});
