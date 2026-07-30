import { NextFunction, Request, Response } from "express";
import { createAuditLog } from "../services/audit.service.js";
import { logger } from "../utils/logger.js";
import { withTimeout } from "../utils/with-timeout.js";

export const auditLogger = (req: Request, _res: Response, next: NextFunction) => {
  const shouldAudit = process.env.NODE_ENV !== "production" || process.env.ENABLE_AUDIT_LOGS === "true";
  if (!shouldAudit) {
    return next();
  }

  const ipAddress = req.ip ?? req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown";
  void (async () => {
    try {
      await withTimeout(
        createAuditLog({
          action: `${req.method} ${req.path}`,
          ip_address: typeof ipAddress === "string" ? ipAddress : "unknown",
          payload: { body: req.body, params: req.params, query: req.query },
        }),
        2000,
        "Audit logging timed out",
      );
    } catch (err) {
      logger.warn({ err }, "Audit logging failed");
    }
  })();

  next();
};
