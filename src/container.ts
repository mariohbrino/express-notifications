import { SESClient } from "@aws-sdk/client-ses";
import type { Logger } from "winston";

import { loadEmailConfig, type EmailConfig } from "@/configs/email.config";
import { EmailService } from "@/services/email.service";
import type { AppContainer } from "@/types/app-container.type";

export const createContainer = (logger: Logger): AppContainer => {
  const emailConfig: EmailConfig = loadEmailConfig();
  const sesClient = new SESClient({
    region: emailConfig.region,
    credentials: {
      accessKeyId: emailConfig.accessKeyId,
      secretAccessKey: emailConfig.secretAccessKey,
    },
  });
  const emailService = new EmailService(
    logger,
    sesClient,
    emailConfig.fromName,
    emailConfig.fromAddress,
  );
  return {
    logger,
    emailService,
  };
};
