import { Router } from "express";

import { createHomeRoutes } from "@/routes/home.route";
import type { AppContainer } from "@/types/app-container.type";

export const createRoutes = (container: AppContainer) => {
  const router = Router();
  router.use("/", createHomeRoutes(container));
  return router;
};
