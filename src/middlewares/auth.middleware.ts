import { AsyncHandler, ErrorHandler } from "../lib/handlers";
import { auth } from "../modules/auth/auth.config";

export const requireAuth = AsyncHandler(async (req, res, next) => {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value) {
      headers.append(key, value);
    }
  });

  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new ErrorHandler("Unauthorized", 401);
  }

  res.locals.user = session.user;
  res.locals.session = session.session;

  next();
});
