import { app } from "@/app";
import { logger } from "@/services/logger.service";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    logger.info(`Server is running at http://localhost:${PORT}`);
    logger.info(`Environment: ${NODE_ENV}`);
  } catch (error) {
    logger.error(
      error instanceof Error ? (error.stack ?? error.message) : String(error),
    );
  }
});
