import { Router } from "express";
<<<<<<< HEAD
import { healthController } from "./health.controller";

const healthRouter = Router();

healthRouter.get("/", healthController.check);
=======

const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Endpoints are working ❤️‍🩹"
  });
});
>>>>>>> b0d09abfacb85d3a4b532337a80d5aeac4e9d4c7

export default healthRouter;
