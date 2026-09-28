import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("ioredis", async () => {
  return {
    default: (await import("ioredis-mock")).default,
  };
});

import { loadCacheConfig } from "@/configs/cache.config";
import { CacheService } from "@/services/cache.service";

describe("cache service", () => {
  const config = loadCacheConfig();
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new CacheService(
      config.host,
      config.port,
      config.schema,
      config.username,
      config.password,
    );
  });

  afterEach(async () => {
    await cacheService.flushDatabase();
  });

  it("should set value in the cache", async () => {
    const key = "test-key";
    const value = "test-value";

    await cacheService.set(key, value);
    const cachedValue = await cacheService.get(key);
    expect(cachedValue).toBe(value);
  });

  it("should get value from the cache", async () => {
    const key = "test-key";
    const value = "test-value";

    await cacheService.set(key, value);
    const cachedValue = await cacheService.get(key);
    expect(cachedValue).toBe(value);
  });
});
