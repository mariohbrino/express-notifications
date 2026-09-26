import type { Server } from "http";

import { app } from "@/app";
import { loadAppConfig } from "@/configs/app.config";
import { logger } from "@/services/logger.service";
import { setupGracefulShutdown } from "@/utils/shutdown.util";

const { appName, nodeEnv, port, isDevelopment } = loadAppConfig();

// Start the server and connect to the database
const server: Server = app.listen(port, async () => {
  try {
    logger.info(`Starting server "${appName}"...`);
    logger.info(`Server is running at http://localhost:${port}`);
    logger.info(`Environment: ${nodeEnv}`);

    if (isDevelopment) {
      logger.info("Press Ctrl+C to stop the server.");
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.stack ?? error.message);
    } else {
      logger.error(String(error));
    }
  }
});

setupGracefulShutdown(server, logger);
