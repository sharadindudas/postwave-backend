import morgan from "morgan";
import { logger } from "../lib/logger";

const stream = {
  write: (message: string) => logger.http(message.trim())
};

export const morganMiddleware = morgan(":method :url :status :res[content-length] bytes - :response-time ms", { stream });
