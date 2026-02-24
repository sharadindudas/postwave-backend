import { config } from "./config";
import app from "./app";

app.get("/", (req, res) => {
  res.json({ message: "API is running! 🚀" });
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
