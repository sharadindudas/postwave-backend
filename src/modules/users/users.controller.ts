import { AsyncHandler, ErrorHandler } from "../../lib/handlers";
import { usersService } from "./users.service";
import { UpdateUserSchema } from "./users.validator";

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

    const updatedUser = await usersService.updateMe(userId, updateUserPayload);

    res.status(200).json({
      success: true,
      message: "Updated user details successfully",
      data: updatedUser
    });
  });
  updateAvatar = AsyncHandler(async (req, res, next) => {
    if (!req.file) throw new ErrorHandler("Please provide an avatar image", 400);
    console.log(req.file);

    res.status(200).json({
      success: true,
      message: "Uploaded avatar successfully"
    });
  });
}

export const usersController = new UsersController();
