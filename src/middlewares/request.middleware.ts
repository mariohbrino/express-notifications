import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { logger, loggerStorage } from "@/utils/logger.util";

const getRequestId = (
  requestIdHeader: Request["headers"]["x-request-id"],
): string => {
  if (typeof requestIdHeader === "string" && requestIdHeader.trim()) {
    return requestIdHeader;
  }

  return uuidv4();
};

export const requestMiddleware = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    request.id = getRequestId(request.headers["x-request-id"]);
    response.setHeader("x-request-id", request.id);

    request.logger = logger;

    // Run everything else down the Express line INSIDE the context storage
    loggerStorage.run({ requestId: request.id }, () => {
      next();
    });
  };
};
