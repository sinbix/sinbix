import {
  checkFilesExist,
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/plugin/testing';

describe('plugins-common e2e', () => {
  const project = 'plugins-common';

  beforeAll(async () => {
    await ensureSinbixProject(project, [
      {
        projectName: 'sinbix-core',
        npmPackageName: '@sinbix/core',
        distPath: 'dist/packages/sinbix/core',
      },
      {
        projectName: 'sinbix-cli',
        npmPackageName: '@sinbix/cli',
        distPath: 'dist/packages/sinbix/cli',
      },
      {
        projectName: 'plugins-common',
        npmPackageName: '@sinbix/common',
        distPath: 'dist/packages/plugins/common',
      },
    ]);
  });

  it('should generate apps', async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:project demo --directory=apps --type=application`
    );

    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:project test/demo --directory=apps --type=application --deps=apps-demo`
    );

    expect(() =>
      checkFilesExist({
        project: project,
        expectedPaths: [`apps/demo/.gitkeep`, `apps/test/demo/.gitkeep`],
      })
    ).not.toThrow();

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

    expect(() =>
      checkFilesExist({
        project: project,
        expectedPaths: [`apps/demo/.gitkeep`, `apps/test/demo/.gitkeep`],
      })
    ).toThrow();

    expect(() =>
      checkFilesExist({
        project: project,
        expectedPaths: [`libs/test/demo/.gitkeep`, `libs/demo/.gitkeep`],
      })
    ).not.toThrow();

    done();
  });

});
