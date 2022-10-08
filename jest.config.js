/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "repositories",
    "jestGlobalMocks.ts",
    "<rootDir>/src/server.ts",
    "<rootDir>/src/utils",
    "<rootDir>/src/config",
    "<rootDir>/tests/factory",
    "<rootDir>/src/app.ts",
    "<rootDir>/src/database",
    "<rootDir>/src/schemas",
    "<rootDir>/src/routers",
    "<rootDir>/src/controllers",
  ],
};
