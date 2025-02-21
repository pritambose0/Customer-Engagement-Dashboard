import express from "express";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));

// Import Routes
import userRoutes from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";

// Routes Declarations
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/healthcheck", healthCheckRouter);

// app.use(errorHandler);

export { app };
