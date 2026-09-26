import type { SendEmailCommandOutput } from "@aws-sdk/client-ses";

export interface IEmailProvider {
  send(
    to: string,
    subject: string,
    body: string,
  ): Promise<SendEmailCommandOutput>;
}
