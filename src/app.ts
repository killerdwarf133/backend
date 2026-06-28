import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

export const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
);
// Larger limit so resale proof-of-ownership images (client-resized data URLs) fit.
app.use(express.json({ limit: "8mb" }));

app.get("/api/health", (_req, res) => {
  return res.json({ ok: true, service: "world-cup-packages-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api", catalogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);
