import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/plugin/testing';

describe('plugins-common e2e', () => {
  it('should create plugins-common', async (done) => {
    const project = 'plugins-common';

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
      command: `generate @sinbix/common:project test/demo --directory=apps --type=application --deps=apps-demo`,
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
