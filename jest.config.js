require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  collectCoverage: false,
  collectCoverageFrom: ["src/@nlp/**/*.{ts,tsx}", "!**/node_modules/**"],
  coverageReporters: ["lcovonly", "text"],
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  setupFiles: ["./jest.setup-file.ts"],
};
