import express from "express";

import { homeRoutes } from "@/routes/home.route";

const router = express.Router();

router.use("/", homeRoutes);

export { router as routes };
