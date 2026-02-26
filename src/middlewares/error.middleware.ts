import { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";
import { ErrorHandler } from "../lib/handlers";
import { ValiError } from "valibot";

export const errorMiddleware: ErrorRequestHandler = (err: ErrorHandler, req, res, next) => {
  // Log all errors
  console.error(err);
  logger.error(err.message);

  // Set default error values
  err.message ||= "Internal Server Error Occurred";
  err.statusCode ||= 500;

  if (err instanceof ValiError) {
    const message = err.issues?.[0]?.message || "Validation failed";
    return res.status(400).json({
      success: false,
      message
    });
  }

  // Return the response
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
