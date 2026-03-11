import { AsyncHandler } from "../../utils/handlers";
import { publicationsService } from "./publications.service";
import type { CreatePublicationSchema } from "./publications.validator";

class PublicationsController {
  createPublication = AsyncHandler(async (req, res, next) => {
    const userId = res.locals.user.id;
    const createPublicationPayload = res.locals.validatedData as CreatePublicationSchema;

    await publicationsService.createPublication(userId, createPublicationPayload);

    res.status(200).json({
      success: true,
      message: "Publication created successfully"
    });
  });
}
export const publicationsController = new PublicationsController();
