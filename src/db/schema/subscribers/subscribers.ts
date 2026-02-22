import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { publications } from "../publications";

export const subscriptionStatusEnum = pgEnum("subscriber_status", ["pending", "active", "unsubscribed"]);
export const subscriptionTierEnum = pgEnum("subscriber_tier", ["free", "premium"]);

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  publication_id: uuid("publication_id")
    .references(() => publications.id)
    .notNull(),
  email: text("email").notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  tier: subscriptionTierEnum("tier").default("free").notNull(),
  subscribed_at: timestamp("subscribed_at").defaultNow(),
  unsubscribed_at: timestamp("unsubscribed_at"),
  created_at: timestamp("created_at").notNull().defaultNow()
});
