import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { notfoundMiddleware } from "./middlewares/not-found.middlware";
import { auth } from "./modules/auth/auth.config";

const app = express();

app.use(morganMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(compression());
app.use(helmet());
app.set("trust proxy", true);

app.all("/api/v1/auth/*splat", toNodeHandler(auth));

app.use(notfoundMiddleware);
app.use(errorMiddleware);

export default app;
