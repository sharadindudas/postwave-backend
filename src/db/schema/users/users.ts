import { pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../common";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  is_verified: boolean("is_verified").default(false).notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  x: text("x"),
  facebook: text("facebook"),
  linkedin: text("linkedin"),
  instagram: text("instagram"),
  youtube: text("youtube"),
  threads: text("threads"),
  tiktok: text("tiktok"),
  ...timestamps
});
