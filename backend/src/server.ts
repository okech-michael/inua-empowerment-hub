import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { json, urlencoded } from "express";
import { config } from "dotenv";
import { logger, requestLogger } from "./utils/logger";
import { errorHandler } from "./middleware/error.middleware";
import donationRoutes from "./routes/donation.routes";
import paymentRoutes from "./routes/payment.routes";
import { healthCheckRouter } from "./routes/health.routes";

config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(requestLogger);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

import { auditLogger } from "./middleware/audit.middleware";

app.use(auditLogger);
app.use("/api/donations", donationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/health", healthCheckRouter);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  logger.info(`Backend server is running on port ${port}`);
});

export default app;
