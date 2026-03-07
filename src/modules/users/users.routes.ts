import { Router } from "express";
import { usersController } from "./users.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { UpdateUserSchema } from "./users.validator";
import { uploadMiddleware } from "../../middlewares/upload.middleware";
import { validateFileUpload } from "../../middlewares/file-upload.middleware";

const userRouter = Router();

userRouter.use("/me", requireAuth);
userRouter.route("/me").get(usersController.getMe).patch(validationMiddleware("body", UpdateUserSchema), usersController.updateMe);
userRouter
  .route("/me/avatar")
  .patch(uploadMiddleware({ type: "single", fieldName: "avatar" }), validateFileUpload("avatar"), usersController.updateAvatar);

export default userRouter;
