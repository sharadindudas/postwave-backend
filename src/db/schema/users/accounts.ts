import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { users } from "./users";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  password: text("password"),
  expiresAt: timestamp("expires_at"),
  ...timestamps
});
