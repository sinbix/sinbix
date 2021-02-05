module.exports = {
  displayName: 'e2e-plugins-node',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/packages/e2e/plugins/node',

  testTimeout: 60 * 60 * 1000
};
