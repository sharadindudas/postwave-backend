import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { publications } from "../publications";

export const subscriptionStatusEnum = pgEnum("subscriber_status", ["pending", "active", "unsubscribed"]);
export const subscriptionTierEnum = pgEnum("subscriber_tier", ["free", "premium"]);

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  publicationId: uuid("publication_id")
    .references(() => publications.id, { onDelete: "cascade" })
    .notNull(),
  email: text("email").notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  tier: subscriptionTierEnum("tier").default("free").notNull(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
