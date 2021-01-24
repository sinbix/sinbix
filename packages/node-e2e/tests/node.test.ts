import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/common/testing';

describe('node e2e', () => {
  it('should create node', async (done) => {
    const projectId = 'node';

    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/node',
          project: projectId,
        },
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/common',
          project: 'common',
        },
      ],
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library lib --directory=libs`,
      project: projectId,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library lib-publishable --directory=libs --publishable --importPath=@${projectId}/publishable-demo`,
      project: projectId,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library lib-none-jest-and-jest --directory=libs --importPath=@${projectId}/lib-none-jest --unitTestRunner=none --linter=none`,
      project: projectId,
    });

    done();
  });
});
