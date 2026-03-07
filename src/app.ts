import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { FRONTEND_URL } from "./config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notfoundMiddleware } from "./middlewares/not-found.middleware";
import userRouter from "./modules/users/users.routes";
import healthRouter from "./modules/health/health.routes";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(compression());
app.use(helmet());
app.set("trust proxy", true);
app.use(morganMiddleware);

app.use("/health", healthRouter);
app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/v1/users", userRouter);

app.use(notfoundMiddleware);
app.use(errorMiddleware);

export default app;
