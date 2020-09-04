module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
