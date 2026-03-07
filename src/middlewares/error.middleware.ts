import { type ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";
import { ErrorHandler } from "../utils/handlers";
import { ValiError } from "valibot";
import { MulterError } from "multer";

export const errorMiddleware: ErrorRequestHandler = (err: ErrorHandler, req, res, next) => {
  console.error(err);
  logger.error(err.message);

  err.message ||= "Internal Server Error Occurred";
  err.statusCode ||= 500;

  if (err instanceof ValiError) {
    const message = err.issues?.[0]?.message || "Validation failed";
    return res.status(400).json({
      success: false,
      message
    });
  }

  if (err instanceof MulterError) {
    const messageMap: Record<string, string> = {
      LIMIT_FILE_SIZE: "File size exceeds the allowed limit",
      LIMIT_FILE_COUNT: "Too many files uploaded",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field"
    };
    const message = messageMap[err.code] || err.message;
    return res.status(400).json({
      success: false,
      message
    });
  }

  err.message ||= "Internal Server Error Occurred";
  err.statusCode ||= 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
