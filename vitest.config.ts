/// <reference types="vitest" />
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      silent: true,
      typecheck: {
        include: ["src/**/*.{ts,js}", "tests/**/*.{ts,js}"],
        exclude: ["node_modules", "dist"],
      },
      env: loadEnv(mode, process.cwd(), ""),
      reporters: ["default", ["junit", { suiteName: "UI tests" }]],
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,js}"],
        exclude: ["node_modules", "tests"],
        reporter: ["text", "html", "json"],
      },
      projects: [
        {
          resolve: {
            tsconfigPaths: true,
          },
          test: {
            name: "unit-tests",
            include: ["tests/units/**/*.test.js", "tests/units/**/*.test.ts"],
            environment: "node",
            pool: "forks",
          },
        },
        {
          resolve: {
            tsconfigPaths: true,
          },
          test: {
            name: "feature-tests",
            include: [
              "tests/features/**/*.test.js",
              "tests/features/**/*.test.ts",
            ],
            environment: "node",
            pool: "forks",
          },
        },
      ],
    },
  };
});
