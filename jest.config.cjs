module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }]
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
