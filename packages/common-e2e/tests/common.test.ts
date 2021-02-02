import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/plugin/testing';

describe('common e2e', () => {
  it('should create common', async (done) => {
    const project = 'common';

    ensureSinbixProject(project, {
      deps: [
        {
          project,
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/common',
        },
      ],
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:project test2/demo --directory=apps --type=application`,
      project,
    });

    done();
  });
});
