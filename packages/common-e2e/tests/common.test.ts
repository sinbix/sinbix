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

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:project test/demo --directory=apps --type=application`,
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:move --project=apps-test2-demo libs/test/demo`,
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/common:move --project=apps-test-demo apps/test2/demo`,
      project,
    });

    done();
  });
});
