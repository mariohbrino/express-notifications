import express from "express";

import { index } from "@/controllers/home.controller";

const router = express.Router();

router.get("/", index);

export { router as homeRoutes };
