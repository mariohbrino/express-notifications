import type { NextFunction, Request, Response } from "express";

const responseMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  void request;
  response.setHeader("Content-Type", "application/json");
  next();
};

export { responseMiddleware };
