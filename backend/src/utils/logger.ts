import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
});

export const requestLogger = (req: any, _res: any, next: any) => {
  logger.info({ method: req.method, url: req.originalUrl, ip: req.ip }, "Incoming request");
  next();
};
