import app from "./app";
import { BETTER_AUTH_URL, PORT } from "./config";
import { logger } from "./lib/logger";

app.listen(PORT, () => {
  logger.info(`Server started at ${BETTER_AUTH_URL}`);
});
