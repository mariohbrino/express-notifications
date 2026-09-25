import "express-serve-static-core";

import type { Logger } from "@/types/logger.type";

declare module "express-serve-static-core" {
  interface Request {
    logger: Logger;
    id: string;
  }
}
