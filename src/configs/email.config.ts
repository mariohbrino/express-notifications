import { z } from "zod";

export type EmailConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  fromName: string;
  fromAddress: string;
};

const schema = z.object({
  REGION: z.coerce.string(),
  AWS_ACCESS_KEY_ID: z.coerce.string(),
  AWS_SECRET_ACCESS_KEY: z.coerce.string(),
  EMAIL_FROM_NAME: z.coerce.string(),
  EMAIL_FROM_ADDRESS: z.coerce.string(),
});

export const loadEmailConfig = (): EmailConfig => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    region: data.REGION,
    accessKeyId: data.AWS_ACCESS_KEY_ID,
    secretAccessKey: data.AWS_SECRET_ACCESS_KEY,
    fromName: data.EMAIL_FROM_NAME,
    fromAddress: data.EMAIL_FROM_ADDRESS,
  };
};
