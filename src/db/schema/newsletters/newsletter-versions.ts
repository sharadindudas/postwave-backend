import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { newsletters } from "./newsletters";

export const newsletterVersions = pgTable("newsletter_versions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  newsletter_id: uuid("newsletter_id")
    .references(() => newsletters.id)
    .notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: jsonb("content"),
  thumbnail: text("thumbnail"),
  created_at: timestamp("created_at").notNull().defaultNow()
});
