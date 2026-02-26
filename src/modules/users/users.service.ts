import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { UpdateUserSchema } from "./users.validator";
import { ErrorHandler } from "../../lib/handlers";

class UsersService {
  async updateMe(userId: string, updateUserPayload: UpdateUserSchema) {
    const [updatedUser] = await db.update(users).set(updateUserPayload).where(eq(users.id, userId)).returning();
    if (!updatedUser) {
      throw new ErrorHandler("User not found", 404);
    }
    return updatedUser;
  }
  async updateAvatar() {}
}

export const usersService = new UsersService();
