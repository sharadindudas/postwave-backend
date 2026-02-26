import multer from "multer";
import { ErrorHandler } from "../lib/handlers";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new ErrorHandler("Only JPEG, PNG and WebP images are allowed", 400));
    }
    cb(null, true);
  }
}).single("avatar");
