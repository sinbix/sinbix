export = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  resolver: '@sinbix/typescript/jest/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
};
