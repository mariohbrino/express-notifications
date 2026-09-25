import { AsyncLocalStorage } from "async_hooks";
import winston from "winston";

export const loggerStorage = new AsyncLocalStorage<{ requestId: string }>();

export const logger = winston.createLogger({
  level: "info",
  // Format Winston output to automatically pull the current Request ID if it exists
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      // Look inside the storage for the current request's unique ID
      const store = loggerStorage.getStore();
      const requestId = store && store.requestId;
      const idTag = requestId ? ` [ID: ${requestId}]` : " [SYSTEM]";

      return `${timestamp} [${level.toUpperCase()}]${idTag}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./storage/logs/app.log" }), // Automatically saves to a file
  ],
});
