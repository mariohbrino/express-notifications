import "express-serve-static-core";

import type { Logger } from "@/utils/logger.util";

declare module "express-serve-static-core" {
  interface Request {
    logger: Logger;
    id: string;
  }
}
