module.exports = {
  displayName: 'demo-apps-nest-server-blog-ms-ui',
  preset: '../../../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../../coverage/packages/demo/apps/nest/server-blog-ms/ui',
};
