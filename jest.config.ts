import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default config;
