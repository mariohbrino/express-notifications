import { EmailService } from "@/services/email.service";
import { logger } from "@/services/logger.service";

import { loadEmailConfig, type EmailConfig } from "@/configs/email.config";
import type { AppContainer } from "@/types/app-container.type";

export const createContainer = (): AppContainer => {
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
    emailService,
  };
};
