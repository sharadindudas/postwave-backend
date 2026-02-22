import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { publications } from "../publications";

export const newsletterStatusEnum = pgEnum("newsletter_status", ["draft", "scheduled", "published"]);

export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  publication_id: uuid("publication_id")
    .references(() => publications.id)
    .notNull(),
  slug: text("slug").notNull(),
  status: newsletterStatusEnum("status").default("draft").notNull(),
  current_version_id: uuid("current_version_id"),
  published_version_id: uuid("published_version_id"),
  scheduled_at: timestamp("scheduled_at"),
  email_sent_at: timestamp("email_sent_at"),
  ...timestamps
});
