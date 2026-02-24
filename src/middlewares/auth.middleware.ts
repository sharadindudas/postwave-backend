import type { Request, Response, NextFunction } from "express";
import { auth } from "../modules/auth/auth.config";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const headers = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value) {
      headers.append(key, value);
    }
  });

  console.log("Request headers====", req.headers);
  console.log("Modified headers====", headers);

  const session = await auth.api.getSession({ headers });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = session.user;
  req.session = session.session;

  next();
};
