import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

interface ErrorResponse extends Error {
  status?: number;
}

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err, path: req.path, method: req.method }, "Unhandled exception");

  const status = err.status ?? 500;
  const response = {
    success: false,
    message: err.message ?? "An unexpected error occurred.",
    error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.stack,
  };

  res.status(status).json(response);
};
