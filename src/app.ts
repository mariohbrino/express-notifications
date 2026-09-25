import express, { type Express } from "express";

import { routes } from "@/routes/index.route";
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

// Register the main router
app.use(routes);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
