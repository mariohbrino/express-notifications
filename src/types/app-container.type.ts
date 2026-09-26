import type { Logger } from "winston";

import type { EmailService } from "@/services/email.service";

export type AppContainer = {
  logger: Logger;
  emailService: EmailService;
};
