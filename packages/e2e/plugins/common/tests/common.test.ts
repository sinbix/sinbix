import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/plugin/testing';

describe('plugins-common e2e', () => {
  const project = 'plugins-common';

  beforeAll(async () => {
    await ensureSinbixProject(project, [
      // {
      //   projectName: 'sinbix-cli',
      //   npmPackageName: '@sinbix/cli',
      //   distPath: 'dist/packages/',
      // },
      {
        projectName: 'plugins-common',
        npmPackageName: '@sinbix/common',
        distPath: 'dist/packages/plugins/common',
      },
    ]);
  });

  // it('test', (done) => {
  //   done();
  // })

  it('should generate apps', async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:project demo --directory=apps --type=application`
    );

    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:project test/demo --directory=apps --type=application --deps=apps-demo`
    );

    done();
  });


  it('should move apps to libs', async (done) => {

    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=apps-demo libs/test/demo`
    );

    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=apps-test-demo libs/demo`
    );

    done();
  });

});
