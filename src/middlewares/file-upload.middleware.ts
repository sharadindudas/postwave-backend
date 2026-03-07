import type { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/handlers";

export const validateFileUpload = (field?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      res.locals.uploadedFiles = [req.file];
      return next();
    }

    if (Array.isArray(req.files) && req.files.length > 0) {
      res.locals.uploadedFiles = req.files;
      return next();
    }

    if (req.files && typeof req.files === "object") {
      const files = Object.values(req.files).flat();
      if (files.length > 0) {
        res.locals.uploadedFiles = files;
        return next();
      }
    }

    throw new ErrorHandler(`Please provide the ${field ?? "File"}`, 400);
  };
};
