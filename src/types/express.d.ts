import { auth } from "../lib/auth";

declare global {
  namespace Express {
    interface Locals {
      user: typeof auth.$Infer.Session.user;
      session: typeof auth.$Infer.Session.session;
      validatedData?: unknown;
      uploadedFiles?: Express.Multer.File[];
    }
  }
}
