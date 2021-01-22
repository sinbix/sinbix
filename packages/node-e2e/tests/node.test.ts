import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/common/testing';

describe('node e2e', () => {
  it('should create node', async (done) => {
    const project = 'node';

    ensureSinbixProject(project, {
      deps: [
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/node',
          project,
        },
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/common',
          project: 'common',
        },
      ],
    });


    await runSinbixCommandAsync({
      command: `generate @sinbix/node:project test2/demo --directory=apps --type=application`,
      project,
    });

    done();
  });
});
