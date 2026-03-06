import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Endpoints are working ❤️‍🩹"
  });
});

export default healthRouter;
