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
      command: `generate @sinbix/node:library demo --directory=libs`,
      project: projectId,
    });


    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library publishable-demo --directory=libs --publishable --importPath=@${projectId}/publishable-demo`,
      project: projectId,
    });

    done();
  });
});
