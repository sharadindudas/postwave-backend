import { sql } from "drizzle-orm";
import { db } from "../../db";
import { AsyncHandler } from "../../utils/handlers";

class HealthController {
  check = AsyncHandler(async (req, res, next) => {
    await db.execute(sql`SELECT 1`);

    res.status(200).json({
      status: "ok",
      services: {
        api: "healthy",
        database: "healthy"
      },
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  });
}

export const healthController = new HealthController();
