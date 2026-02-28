import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { UpdateUserSchema } from "./users.validator";
import { ErrorHandler } from "../../lib/handlers";
import { deleteFromCloudinary, uploadToCloudinary } from "../../lib/cloudinary";

class UsersService {
  async updateMe(userId: string, updateUserPayload: UpdateUserSchema) {
    const [updatedUser] = await db.update(users).set(updateUserPayload).where(eq(users.id, userId)).returning();
    if (!updatedUser) {
      throw new ErrorHandler("User not found", 404);
    }
    return updatedUser;
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const [currentUser] = await db.select().from(users).where(eq(users.id, userId));

    if (!currentUser) {
      throw new ErrorHandler("User not found", 404);
    }

    if (currentUser.imagePublicId) {
      await deleteFromCloudinary(currentUser.imagePublicId);
    }

    const folderPath = ["users", userId, "avatars"].join("/");

    const { url, publicId } = await uploadToCloudinary(file, {
      folder: folderPath,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" }
      ]
    });

    const [updatedUser] = await db.update(users).set({ image: url, imagePublicId: publicId }).where(eq(users.id, userId)).returning();

    return updatedUser;
  }
}

export const usersService = new UsersService();
