import { Router } from "express";

export const healthCheckRouter = Router();

healthCheckRouter.get("/", (_, res) => {
  res.json({ success: true, message: "Backend is healthy" });
});
