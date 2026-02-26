import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "../common";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
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
