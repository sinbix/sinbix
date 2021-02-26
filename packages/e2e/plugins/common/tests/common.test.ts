import {
  ensureSinbixProject,
  runSinbixCommandAsync
} from "@sinbix/plugin/testing";

describe('plugins-common e2e', () => {
  it('should create plugins-common', async (done) => {
    const project = 'plugins-common';

    await ensureSinbixProject(project, [
      {
        project,
        npmPackageName: '@sinbix/common',
        distPath: 'dist/packages/plugins/common',
      },
    ]);

    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:project demo --directory=apps --type=application`,
      {
        silent: false
      }
    );
    //
    // await runSinbixCommandAsync(
    //   project,
    //   `generate @sinbix/common:project test/demo --directory=apps --type=application --deps=apps-demo`
    // );
    //
    // await runSinbixCommandAsync(
    //   project,
    //   `generate @sinbix/common:move --project=apps-demo libs/test/demo`
    // );
    //
    // await runSinbixCommandAsync(
    //   project,
    //   `generate @sinbix/common:move --project=apps-test-demo libs/demo`
    // );

    done();
  });
});
