// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    // NOTE: those thresholds should never be lowered, also we are aware the coverage is ridiculous (technical debt)
    global: {
      statements: 70,
      branches: 44,
      functions: 61,
      lines: 75,
    },
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/test/*.test.js'],
};
