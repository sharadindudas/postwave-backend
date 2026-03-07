import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "../config";

const queryClient = postgres(DATABASE_URL);
export const db = drizzle({
  client: queryClient,
  casing: "snake_case",
  logger: true
});
