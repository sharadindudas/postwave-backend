import { auth } from "../lib/auth";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";

export const requireAuth = AsyncHandler(async (req, res, next) => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) throw new ErrorHandler("Unauthorized", 401);

  res.locals.user = session.user;
  res.locals.session = session.session;
  next();
});
