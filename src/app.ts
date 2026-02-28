import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import { auth } from "./lib/auth";
import { errorMiddleware } from "./middlewares/error.middleware";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { notfoundMiddleware } from "./middlewares/not-found.middlware";
import userRouter from "./modules/users/users.routes";

const app = express();

app.use(morganMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(compression());
app.use(helmet());
app.set("trust proxy", true);

app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/v1/users", userRouter);

app.use(notfoundMiddleware);
app.use(errorMiddleware);

export default app;
