import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { mockClient } from "aws-sdk-client-mock";
import { beforeEach, describe, expect, it } from "vitest";

import { EmailService } from "@/services/email.service";
import { LoggerService } from "@/services/logger.service";

describe("email service", () => {
  const sesClient = new SESClient({});
  const sesMock = mockClient(sesClient);
  const loggerService = new LoggerService();
  const logger = loggerService.createLogger("./storage/logs/email.log");
  const emailService = new EmailService(
    logger,
    sesClient,
    "Test Sender",
    "test@example.com",
  );

  beforeEach(() => {
    sesMock.reset();
  });

  it("sends an email with the expected payload", async () => {
    const response = { MessageId: "message-123" };

    sesMock.on(SendEmailCommand).resolves(response);

    const emailResponse = await emailService.send(
      "recipient@example.com",
      "Test subject",
      "Test body",
    );

    expect(emailResponse).toEqual(response);

    expect(sesMock.commandCalls(SendEmailCommand)).toHaveLength(1);
    expect(sesMock.commandCalls(SendEmailCommand)[0]?.args[0].input).toEqual({
      Destination: {
        ToAddresses: ["recipient@example.com"],
      },
      Message: {
        Subject: {
          Data: "Test subject",
        },
        Body: {
          Text: {
            Data: "Test body",
          },
        },
      },
      Source: "Test Sender <test@example.com>",
    });
  });
});
