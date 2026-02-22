import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { users } from "../users";
import { newsletters } from "./newsletters";

export const newsletterComments = pgTable("newsletter_comments", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  newsletter_id: uuid("newsletter_id")
    .references(() => newsletters.id)
    .notNull(),
  parent_id: uuid("parent_id"),
  content: text("content").notNull(),
  created_by: uuid("created_by")
    .references(() => users.id)
    .notNull(),
  ...timestamps
});
