import { boolean, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { publications } from "./publications";

export const domainStatusEnum = pgEnum("publication_domain_status", ["active", "inactive", "configuration_in_progress", "not_validated", "pending"]);

export const publicationDomains = pgTable("publication_domains", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  publicationId: uuid("publication_id")
    .references(() => publications.id, { onDelete: "cascade" })
    .notNull(),
  domain: text("domain").notNull().unique(),
  status: domainStatusEnum("status").default("pending"),
  is_primary: boolean("is_primary").default(false),
  ...timestamps
});
