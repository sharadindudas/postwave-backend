import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateFileUpload } from "../../middlewares/file-upload.middleware";
import { uploadMiddleware } from "../../middlewares/upload.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { usersController } from "./users.controller";
import { UpdateUserSchema } from "./users.validator";

const userRouter = Router();

userRouter.use("/me", requireAuth);
userRouter.route("/me").get(usersController.getMe).patch(validationMiddleware("body", UpdateUserSchema), usersController.updateMe);
userRouter
  .route("/me/avatar")
  .patch(uploadMiddleware({ type: "single", fieldName: "avatar" }), validateFileUpload("avatar"), usersController.updateAvatar);

export default userRouter;
