import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { UpdateUserOnboardingSchema, UpdateUserSchema } from "./users.validator";
import { ErrorHandler } from "../../utils/handlers";
import { deleteFromCloudinary, uploadToCloudinary } from "../../lib/cloudinary";

class UsersService {
  async updateMe(userId: string, updateUserPayload: UpdateUserSchema) {
    await db.update(users).set(updateUserPayload).where(eq(users.id, userId));
  }

  async updateAvatar(user: typeof users.$inferSelect, file: Express.Multer.File) {
    if (user.imagePublicId) {
      await deleteFromCloudinary(user.imagePublicId);
    }

    const folderPath = ["users", user.id, "avatars"].join("/");
    const { url, publicId } = await uploadToCloudinary(file, {
      folder: folderPath,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" }
      ]
    });

    await db.update(users).set({ image: url, imagePublicId: publicId }).where(eq(users.id, user.id));
  }

  async updateUserOnboarding(userId: string, updateUserOnboardingPayload: UpdateUserOnboardingSchema) {
    await db.update(users).set(updateUserOnboardingPayload).where(eq(users.id, userId));
  }
}

export const usersService = new UsersService();
