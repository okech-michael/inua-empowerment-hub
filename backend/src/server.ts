import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { json, urlencoded } from "express";
import { config } from "dotenv";
import { logger, requestLogger } from "./utils/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";
import donationRoutes from "./routes/donation.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import formsRoutes from "./routes/forms.routes.js";
import { healthCheckRouter } from "./routes/health.routes.js";

config();

const app = express();

app.set("trust proxy", 1);

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
    keyGenerator: (req) => {
      const forwarded = req.headers["x-forwarded-for"];
      if (typeof forwarded === "string") {
        return forwarded.split(",")[0].trim();
      }

      if (Array.isArray(forwarded)) {
        return forwarded[0] ?? req.ip ?? "unknown";
      }

      return req.ip ?? "unknown";
    },
  }),
);

import { auditLogger } from "./middleware/audit.middleware.js";

app.use(auditLogger);
app.use("/api/donations", donationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", formsRoutes);
app.use("/api/health", healthCheckRouter);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
const shouldListen = process.env.NODE_ENV !== "test" && !process.env.VERCEL;

if (shouldListen) {
  app.listen(port, () => {
    logger.info(`Backend server is running on port ${port}`);
  });
}

export default app;
