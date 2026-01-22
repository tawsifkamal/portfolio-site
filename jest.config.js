module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/server/'
  ],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/main.server.ts',
    '!src/setup-jest.ts',
    '!src/app/interfaces/**',
    '!src/app/app.config.ts',
    '!src/app/app.config.server.ts',
    '!src/app/app.routes.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov', 'json'],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 70,
      lines: 80,
      statements: 80
    }
  }
};
