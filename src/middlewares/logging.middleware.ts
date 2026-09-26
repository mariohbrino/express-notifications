import morgan from "morgan";
import type { Logger } from "winston";

export const httpLoggingMiddleware = (logger: Logger) => {
  const morganStream = {
    write: (message: string) => {
      // Strip trailing newline character that Morgan automatically appends
      logger.info(message.trim());
    },
  };
  return morgan(":method :url :status - :response-time ms", {
    stream: morganStream,
  });
};
