import { NextFunction, Request, Response } from "express";
import { createAuditLog } from "../services/audit.service.js";
import { logger } from "../utils/logger.js";

export const auditLogger = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await createAuditLog({
      action: `${req.method} ${req.path}`,
      ip_address: req.ip,
      payload: { body: req.body, params: req.params, query: req.query },
    });
  } catch (err) {
    logger.warn({ err }, "Audit logging failed");
  }
  next();
};
