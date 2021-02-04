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
      command: `generate @sinbix/common:project demo --directory=apps --type=application`,
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:project test/demo --directory=apps --type=application`,
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:move --project=apps-demo libs/test/demo`,
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:move --project=apps-test-demo libs/demo`,
      project,
    });

    done();
  });
});
