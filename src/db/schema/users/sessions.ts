import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  ...timestamps
});
