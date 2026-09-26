import type { Logger } from "winston";

import { loadEmailConfig, type EmailConfig } from "@/configs/email.config";
import { EmailService } from "@/services/email.service";
import type { AppContainer } from "@/types/app-container.type";

export const createContainer = (logger: Logger): AppContainer => {
  const emailConfig: EmailConfig = loadEmailConfig();
  const emailService = new EmailService(
    logger,
    emailConfig.region,
    emailConfig.accessKeyId,
    emailConfig.secretAccessKey,
    emailConfig.fromName,
    emailConfig.fromAddress,
  );
  return {
    logger,
    emailService,
  };
};
