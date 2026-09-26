import { AsyncLocalStorage } from "async_hooks";
import winston from "winston";

type StorageType = { requestId: string };

export class LoggerService {
  #storage: AsyncLocalStorage<StorageType>;

  constructor() {
    this.#storage = new AsyncLocalStorage<StorageType>();
  }

  runWithRequestId = (requestId: string, callback: () => void) => {
    this.#storage.run({ requestId }, callback);
  };

  createLogger = (filename: string) => {
    return winston.createLogger({
      level: "info",
      // Format Winston output to automatically pull the current Request ID if it exists
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          // Look inside the storage for the current request's unique ID
          const requestId = this.#storage.getStore()?.requestId;
          const idTag = requestId ? ` [ID: ${requestId}]` : " [SYSTEM]";

          return `${timestamp} [${level.toUpperCase()}]${idTag}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename, lazy: true }), // Automatically saves to a file
      ],
    });
  };
}
