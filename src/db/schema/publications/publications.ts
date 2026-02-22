import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { users } from "../users";

export const publications = pgTable("publications", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  owner_id: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  logo: text("logo"),
  subdomain: text("subdomain").notNull().unique(),
  ...timestamps
});
