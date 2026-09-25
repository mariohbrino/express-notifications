import "express-serve-static-core";

import type { Logger } from "@/services/logger.service";

declare module "express-serve-static-core" {
  interface Request {
    logger: Logger;
    id: string;
  }
}
