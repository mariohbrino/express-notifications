import type { Request, Response } from "express";

export const index = (request: Request, response: Response) => {
  void request;
  return response.json({ message: "Hello, World!" });
};
