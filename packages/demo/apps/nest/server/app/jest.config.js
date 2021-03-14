module.exports = {
  displayName: 'demo-apps-nest-server-app',
  preset: '../../../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../../coverage/packages/demo/apps/nest/server/app',
};
