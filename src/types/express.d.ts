import { auth } from "../modules/auth/auth.config";

declare global {
  namespace Express {
    interface Locals {
      user: typeof auth.$Infer.Session.user;
      session: typeof auth.$Infer.Session.session;
      validatedData?: unknown;
    }
  }
}
