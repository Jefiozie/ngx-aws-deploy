export default {
  displayName: 'ngx-aws-deploy',

  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ngx-aws-deploy',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
