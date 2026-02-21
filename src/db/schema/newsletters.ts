import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./common";

export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  thumbnail: text("thumbnail"),
  content: jsonb("content"),
  ...timestamps
});
