import { Router } from "express";

import { HomeController } from "@/controllers/home.controller";
import type { AppContainer } from "@/types/app-container.type";

const createHomeRoutes = (container: AppContainer) => {
  const router = Router();
  const homeController = new HomeController(container);

  router.get("/", homeController.index);

  return router;
};

export { createHomeRoutes };
