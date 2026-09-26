import express, { type Express, type Router } from "express";

import { createContainer } from "@/container";
import { createRoutes } from "@/routes/index.route";
import type { AppContainer } from "@/types/app-container.type";
import {
  errorHandlerMiddleware,
  handleNotFoundMiddleware,
} from "./middlewares/error.middleware";
import { httpLoggingMiddleware } from "./middlewares/logging.middleware";
import { requestMiddleware } from "./middlewares/request.middleware";
import { responseMiddleware } from "./middlewares/response.middleware";

// Create an instance of the Express application
const app: Express = express();

// Apply middlewares
app.use(requestMiddleware());
app.use(express.json());
app.use(httpLoggingMiddleware());
app.use(responseMiddleware());

// Create the application container and routes
const container: AppContainer = createContainer();
const routes: Router = createRoutes(container);

// Apply the routes to the Express application
app.use(routes);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
