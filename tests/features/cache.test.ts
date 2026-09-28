import { afterEach, describe, expect, it } from "vitest";

import { loadCacheConfig } from "@/configs/cache.config";
import { CacheService } from "@/services/cache.service";

describe("cache service", () => {
  const config = loadCacheConfig();
  const cacheService = new CacheService(
    config.host,
    config.port,
    config.schema,
    config.username,
    config.password,
  );

  afterEach(async () => {
    await cacheService.flushDatabase();
  });

  it("should load the cache configuration correctly", () => {
    const config = loadCacheConfig();

    expect(config).toHaveProperty("host");
    expect(config).toHaveProperty("port");
    expect(config).toHaveProperty("username");
    expect(config).toHaveProperty("password");
    expect(config).toHaveProperty("schema");
  });

  it("should connect to the cache service", async () => {
    expect(await cacheService.checkConnection()).toBe(true);
  });
});
