import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { usersController } from "./users.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { UpdateUserSchema } from "./users.validator";
import { uploadMiddleware } from "../../middlewares/upload.middleware";

const userRouter = Router();
userRouter.get("/me", requireAuth, usersController.getMe);
userRouter.patch("/me", requireAuth, validationMiddleware("body", UpdateUserSchema), usersController.updateMe);
userRouter.patch("/me/avatar", requireAuth, uploadMiddleware, usersController.updateAvatar);

export default userRouter;
