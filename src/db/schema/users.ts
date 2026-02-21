import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./common";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  ...timestamps
});
