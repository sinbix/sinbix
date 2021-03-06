export = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  resolver: '@sinbix/node/src/jest/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
};
