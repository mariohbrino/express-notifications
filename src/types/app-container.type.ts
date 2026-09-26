import type { EmailService } from "@/services/email.service";
import type { Logger } from "winston";

export type AppContainer = {
  logger: Logger;
  emailService: EmailService;
};
