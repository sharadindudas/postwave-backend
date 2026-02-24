import { config } from "./config";
import app from "./app";
import { logger } from "./lib/logger";

app.get("/", (req, res) => {
  res.json({ message: "API is running! 🚀" });
});

app.listen(config.port, () => {
  logger.info(`Server running on ${config.betterAuthUrl}`);
});
