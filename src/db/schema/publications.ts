import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./common";

export const publications = pgTable("publications", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  subdomain: text("subdomain").notNull().unique(),
  ...timestamps
});
