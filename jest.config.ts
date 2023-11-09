export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  // moduleDirectories: ['node_modules', '.'],
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1"
  },
  moduleDirectories: ["<rootDir>/src/", "node_modules", "src", "js/src/tetrominos.js", "js/src/rotation.js", "<rootDir>/js/src", "<rootDir>/js/"],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/database', 'src/test', 'src/types'],
  reporters: ['default', 'jest-junit'],
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(quill-mention)/)"
  ],
  extensionsToTreatAsEsm: ['.ts']
};