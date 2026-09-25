import type { Server } from "http";

import { app } from "@/app";
import { logger } from "@/services/logger.service";
import { setupGracefulShutdown } from "@/utils/shutdown.util";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

// Start the server and connect to the database
const server: Server = app.listen(PORT, async () => {
  try {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`Environment: ${NODE_ENV}`);
    logger.info("Press Ctrl+C to stop the server.");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.stack ?? error.message);
    } else {
      logger.error(String(error));
    }
  }
});

setupGracefulShutdown(server, logger);
