import { type NextFunction, type Request, type Response } from "express";

type ErrorContext = {
  title: string;
  error: string;
  stack?: string;
};

type HttpError = Error & {
  status?: number;
};

/**
 * Handle 404 Not Found errors
 * @param request The incoming request object
 * @param response The response object (not used)
 * @param next The next middleware function
 * @returns void
 */
export const handleNotFoundMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  void response;
  const err: HttpError = new Error(
    `Page Not Found: ${request.method} ${request.originalUrl}`,
  );
  err.status = 404;
  return next(err);
};

/**
 * Handle errors
 * @param error The error object
 * @param request The incoming request object
 * @param response The response object
 * @param _next The next middleware function (not used)
 */
export const errorHandlerMiddleware = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  void request;
  void next;

  // Determine status
  const status = error.status || 500;

  if (status === 404) {
    request.logger.warn(error.message);
  } else {
    request.logger.error(`Error occurred: ${error.message}`);
    request.logger.error(`Stack trace: ${error.stack}`);
  }

  // Prepare data for the JSON response
  const context: ErrorContext = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: error.message,
  };

  if (process.env["NODE_ENV"] === "development") {
    context.stack = JSON.stringify(error.stack, null, 2);
  }

  // Send the appropriate error response as JSON
  return response.status(status).json({ context });
};
