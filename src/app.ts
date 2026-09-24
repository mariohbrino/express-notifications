import express from "express";

import { routes } from "@/routes/index.route";

// Create an instance of the Express application
const app = express();

// Apply middlewares
app.use(express.json());

// Register the main router
app.use(routes);

export { app };
