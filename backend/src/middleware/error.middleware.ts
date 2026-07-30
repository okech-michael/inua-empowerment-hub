import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

interface ErrorResponse extends Error {
  status?: number;
  type?: string;
}

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err, path: req.path, method: req.method }, "Unhandled exception");

  const isBodyParserError = err instanceof SyntaxError && (err.type === "entity.parse.failed" || err.message.includes("JSON"));
  const status = isBodyParserError ? 400 : (err.status ?? 500);
  const response = {
    success: false,
    message: isBodyParserError ? "Invalid JSON in request body." : (err.message ?? "An unexpected error occurred."),
    error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.stack,
  };

  res.status(status).json(response);
};
