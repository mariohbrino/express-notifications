import type { Server } from "http";

import type { Logger } from "@/services/logger.service";

export const setupGracefulShutdown = (server: Server, logger: Logger) => {
  const handler = async (signal: string) => {
    try {
      logger.info(`${signal} signal received. Shutting down gracefully.`);
      server.close(() => {
        logger.info("Server closed successfully.");
        process.exit(0);
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.stack ?? error.message);
      } else {
        logger.error(String(error));
      }
      process.exit(1);
    }
  };

  process.on("SIGINT", handler);
  process.on("SIGTERM", handler);
};
