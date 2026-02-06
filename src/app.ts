import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "./config/redis";


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FarmLokal backend is running 🚜");
});

import { getAccessToken } from "./auth/token.service";

app.get("/token", async (req, res, next) => {
  try {
    const token = await getAccessToken();
    res.json({ token });
  } catch (err) {
    next(err);
  }
});


import externalRoutes from "./routes/external.routes";
console.log("External routes loaded");
app.use("/api", externalRoutes);

import webhookRoutes from "./routes/webhook.routes";
app.use("/api", webhookRoutes);

import productRoutes from "./products/product.routes";
app.use("/api", productRoutes);

export default app;