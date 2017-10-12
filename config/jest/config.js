module.exports = {
  resolver: 'jest-directory-named-resolver',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupFiles: [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/config/jest/setup.js',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
  ],
  testResultsProcessor: 'jest-junit',
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.js',
  ],
};
