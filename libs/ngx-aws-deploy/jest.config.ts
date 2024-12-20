/* eslint-disable */
export default {
  displayName: 'ngx-aws-deploy',

  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ngx-aws-deploy',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
