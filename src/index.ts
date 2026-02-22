import { PORT } from "./config";
import app from "./app";

app.get("/", (req, res) => {
  res.json({ message: "API is running! 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
