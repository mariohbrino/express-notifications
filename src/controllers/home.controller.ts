import type { Request, Response } from "express";

import { BaseController } from "@/controllers/base-controller.controller";
import type { AppContainer } from "@/types/app-container.type";

export class HomeController extends BaseController {
  constructor(container: AppContainer) {
    super(container);
  }
  index = (request: Request, response: Response) => {
    void request;
    return response.json({ message: "Hello, World!" });
  };
}
