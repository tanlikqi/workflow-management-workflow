import { Router } from "express";
import { listCalls } from "../db.js";

export const callsRouter = Router();

callsRouter.get("/", (req, res) => {
  const { limit, status } = req.query;

  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : undefined;
  const validStatus =
    status === "success" || status === "hangup" ? status : undefined;

  res.json(
    listCalls({
      limit: Number.isFinite(parsedLimit) ? parsedLimit : undefined,
      status: validStatus,
    }),
  );
});
