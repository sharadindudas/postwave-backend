import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./modules/auth/auth.config";

const app = express();
app.use(express.json());

app.all("/api/v1/auth/*splat", toNodeHandler(auth));

export default app;
