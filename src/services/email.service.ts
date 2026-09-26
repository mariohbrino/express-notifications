import {
  SESClient,
  SendEmailCommand,
  type SendEmailCommandInput,
  type SendEmailCommandOutput,
} from "@aws-sdk/client-ses";
import type { Logger } from "winston";

import type { IEmailProvider } from "@/types/email.type";

export class EmailService implements IEmailProvider {
  #sesClient: SESClient;
  #logger: Logger;
  #emailFromName: string;
  #emailFromAddress: string;

  constructor(
    logger: Logger,
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
    emailFromName: string,
    emailFromAddress: string,
  ) {
    this.#sesClient = new SESClient({
      region: region,
      credentials: { accessKeyId, secretAccessKey },
    });
    this.#logger = logger;
    this.#emailFromName = emailFromName;
    this.#emailFromAddress = emailFromAddress;
  }

  #prepareEmailPayload(
    to: string,
    subject: string,
    body: string,
  ): SendEmailCommandInput {
    return {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
      Source: `${this.#emailFromName} <${this.#emailFromAddress}>`,
    };
  }

  send = async (
    to: string,
    subject: string,
    body: string,
  ): Promise<SendEmailCommandOutput> => {
    try {
      const params: SendEmailCommandInput = this.#prepareEmailPayload(
        to,
        subject,
        body,
      );
      const command = new SendEmailCommand(params);
      return await this.#sesClient.send(command);
    } catch (error) {
      this.#logger.error("Failed to send email:", error);
      throw error;
    }
  };
}
