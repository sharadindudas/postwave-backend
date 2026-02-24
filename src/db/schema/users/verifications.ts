import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../common";

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey().notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ...timestamps
});
