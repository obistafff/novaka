import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { helmetMw } from "./middlewares/security.js";
import { ensureAuthIndexes } from "./auth/auth.repo.js";

// Routes (Prisma / Postgres)
import ordersRoutes from "./routes/orders.routes.js";
import productsRoutes from "./routes/products.routes.js";
import reservationsRoutes from "./routes/reservations.routes.js";

// Auth routes (Mongo)
import authRoutes from "./routes/auth.routes.js";

const app = express();

/* ------------------------- */
/* Core middlewares          */
/* ------------------------- */

app.use(helmetMw);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    exposedHeaders: ["X-CSRF-Token"],
  })
);

app.use(express.json());
app.use(cookieParser());

/* ------------------------- */
/* Routes                    */
/* ------------------------- */

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Auth (Mongo sessions)
app.use("/api/auth", authRoutes);

// Business (Prisma/Postgres)
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/reservations", reservationsRoutes);

/* ------------------------- */
/* Startup                   */
/* ------------------------- */

(async () => {
  try {
    await ensureAuthIndexes();
    console.log("✓ Mongo auth indexes ensured");
  } catch (err) {
    console.error("Auth index init failed:", err);
    process.exit(1);
  }
})();

export default app;
