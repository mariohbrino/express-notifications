import Redis, { type Redis as TRedis } from "ioredis";

type CacheConfig = {
  host: string;
  port: number;
  db: number;
  username?: string;
  password?: string;
};

export class CacheService {
  #redisClient: TRedis;

  constructor(
    host: string,
    port: number,
    schema: number,
    username?: string,
    password?: string,
  ) {
    const config: CacheConfig = this.#buildCacheConfig({
      host,
      port,
      db: schema,
      username,
      password,
    });

    this.#redisClient = new Redis(config);
  }

  #buildCacheConfig = (config: CacheConfig) => {
    const buildConfig: CacheConfig = {
      host: config.host,
      port: config.port,
      db: config.db,
    };

    if (config.username) {
      buildConfig.username = config.username;
    }

    if (config.password) {
      buildConfig.password = config.password;
    }

    return buildConfig;
  };

  get = async (key: string) => {
    return await this.#redisClient.get(key);
  };

  set = async (key: string, value: string) => {
    await this.#redisClient.set(key, value);
  };

  flushDatabase = async () => {
    await this.#redisClient.flushdb();
  };

  checkConnection = async () => {
    const pong = await this.#redisClient.ping();
    return pong === "PONG";
  };
}
