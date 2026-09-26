import express, { type Express, type Router } from "express";
import type { Logger } from "winston";

import { createContainer } from "@/container";
import {
  errorHandlerMiddleware,
  handleNotFoundMiddleware,
} from "@/middlewares/error.middleware";
import { httpLoggingMiddleware } from "@/middlewares/logging.middleware";
import { requestMiddleware } from "@/middlewares/request.middleware";
import { responseMiddleware } from "@/middlewares/response.middleware";
import { createRoutes } from "@/routes/index.route";
import { LoggerService } from "@/services/logger.service";
import type { AppContainer } from "@/types/app-container.type";

// Create an instance of the Express application
const app: Express = express();

// Create the logger service and the application container with the logger instance
const loggerService = new LoggerService();
const logger: Logger = loggerService.createLogger("./storage/logs/app.log");
const container: AppContainer = createContainer(logger);

// Apply middlewares
app.use(requestMiddleware(loggerService));
app.use(express.json());
app.use(httpLoggingMiddleware(logger));
app.use(responseMiddleware());

// Create the application routes using the container
const routes: Router = createRoutes(container);

// Apply the routes to the Express application
app.use(routes);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware(logger));

export { app, container };
