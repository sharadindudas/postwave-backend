import { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";
import { ErrorHandler } from "../lib/handlers";

export const errorMiddleware: ErrorRequestHandler = (err: ErrorHandler, req, res, next) => {
  // Log all errors
  console.error(err);
  logger.error(err.message);
  console.log(err);

  // Set default error values
  err.message ||= "Internal Server Error Occurred";
  err.statusCode ||= 500;

  // Return the response
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
