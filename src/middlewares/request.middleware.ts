import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import type { LoggerService } from "@/services/logger.service";

const getRequestId = (
  requestIdHeader: Request["headers"]["x-request-id"],
): string => {
  if (typeof requestIdHeader === "string" && requestIdHeader.trim()) {
    return requestIdHeader;
  }

  return uuidv4();
};

export const requestMiddleware = (loggerService: LoggerService) => {
  return (request: Request, response: Response, next: NextFunction) => {
    request.id = getRequestId(request.headers["x-request-id"]);
    response.setHeader("x-request-id", request.id);

    // Run everything else down the Express line INSIDE the context storage
    loggerService.runWithRequestId(request.id, () => {
      next();
    });
  };
};
