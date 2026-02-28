import multer from "multer";
import { ErrorHandler } from "../lib/handlers";

const DEFAULT_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

export const uploadMiddleware = (config: UploadConfig, options: UploadMiddlewareOptions = {}) => {
  const allowedMimeTypes = options.mimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES;
  const maxFileSize = options.maxFileSize ?? DEFAULT_MAX_FILE_SIZE;

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new ErrorHandler(`Invalid file type. Allowed types: ${allowedMimeTypes.join(", ")}`, 400));
      }
      cb(null, true);
    }
  });

  switch (config.type) {
    case "single":
      return upload.single(config.fieldName);
    case "multiple":
      return upload.array(config.fieldName, config.maxCount);
    case "fields":
      return upload.fields(config.fields);
  }
};
