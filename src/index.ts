import { config } from "./config";
import app from "./app";
import { logger } from "./lib/logger";

app.listen(config.port, () => {
  logger.info(`Server running on ${config.betterAuthUrl}`);
});
