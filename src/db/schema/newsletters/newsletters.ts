import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { publications } from "../publications";

export const newsletterStatusEnum = pgEnum("newsletter_status", ["draft", "scheduled", "published"]);

export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  publicationId: uuid("publication_id")
    .references(() => publications.id, { onDelete: "cascade" })
    .notNull(),
  slug: text("slug").notNull(),
  status: newsletterStatusEnum("status").default("draft").notNull(),
  currentVersionId: uuid("current_version_id"),
  publishedVersionId: uuid("published_version_id"),
  scheduledAt: timestamp("scheduled_at"),
  emailSentAt: timestamp("email_sent_at"),
  ...timestamps
});
