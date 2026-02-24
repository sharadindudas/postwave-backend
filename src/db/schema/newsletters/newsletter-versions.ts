import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { newsletters } from "./newsletters";

export const newsletterVersions = pgTable("newsletter_versions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  newsletterId: uuid("newsletter_id")
    .references(() => newsletters.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: jsonb("content"),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
