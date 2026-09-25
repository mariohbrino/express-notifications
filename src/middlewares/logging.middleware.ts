import morgan from "morgan";

import { logger } from "@/services/logger.service";

export const httpLoggingMiddleware = () => {
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
