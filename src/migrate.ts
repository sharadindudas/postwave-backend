import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "./config";

const runMigrate = async () => {
  const client = postgres(config.databaseUrl, { max: 1 });
  const db = drizzle(client);

  console.log("⏳ Running migrations...");
  await migrate(db, { migrationsFolder: "./migration" });
  console.log("✅ Migrations done!");

  await client.end();
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
