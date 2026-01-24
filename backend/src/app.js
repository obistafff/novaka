import express from "express";
import cors from "cors";
import reservationsRouter from "./routes/reservations.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nokava backend is running. Try /api/health");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/reservations", reservationsRouter);

export default app;
