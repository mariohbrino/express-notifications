import { z } from "zod";

export type AppConfig = {
  appName: string;
  nodeEnv: string;
  port: string;
  isDevelopment: boolean;
};

const schema = z.object({
  APP_NAME: z.coerce.string(),
  NODE_ENV: z.coerce.string(),
  PORT: z.coerce.string(),
});

export const loadAppConfig = (): AppConfig => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    appName: data.APP_NAME,
    nodeEnv: data.NODE_ENV,
    port: data.PORT,
    isDevelopment: data.NODE_ENV === "development",
  };
};
