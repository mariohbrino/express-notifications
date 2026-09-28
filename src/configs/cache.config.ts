import { z } from "zod";

export type CacheConfig = {
  host: string;
  port: number;
  username?: string;
  password?: string;
  schema: number;
};

const schema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((val) => parseInt(val)),
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_SCHEMA: z.string().transform((val) => parseInt(val)),
});

export const loadCacheConfig = (): CacheConfig => {
  const parsed = schema.parse(process.env);
  return {
    host: parsed.REDIS_HOST,
    port: parsed.REDIS_PORT,
    username: parsed.REDIS_USERNAME || undefined,
    password: parsed.REDIS_PASSWORD || undefined,
    schema: parsed.REDIS_SCHEMA,
  };
};
