import type { users } from "../../db/schema";
import { AsyncHandler } from "../../utils/handlers";
import { usersService } from "./users.service";
import type { UpdateUserSchema } from "./users.validator";

class UsersController {
  getMe = AsyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Fetched user details successfully",
      data: res.locals.user
    });
  });
  updateMe = AsyncHandler(async (req, res, next) => {
    const userId = res.locals.user.id;
    const updateUserPayload = res.locals.validatedData as UpdateUserSchema;

    await usersService.updateMe(userId, updateUserPayload);

    res.status(200).json({
      success: true,
      message: "Updated user details successfully"
    });
  });
  updateAvatar = AsyncHandler(async (req, res, next) => {
    const avatarImage = res.locals.uploadedFiles?.[0] as Express.Multer.File;
    const currentUser = res.locals.user as typeof users.$inferSelect;

    await usersService.updateAvatar(currentUser, avatarImage);

    res.status(200).json({
      success: true,
      message: "Updated avatar successfully"
    });
  });
}
export const usersController = new UsersController();
