import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreatePublicationSchema } from "./publications.validator";
import { publicationsController } from "./publications.controller";

const publicationRouter = Router();

publicationRouter.use("/", requireAuth);
publicationRouter.route("/").post(validationMiddleware("body", CreatePublicationSchema), publicationsController.createPublication);

export default publicationRouter;
