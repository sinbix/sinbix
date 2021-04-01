import {
  checkFilesExist,
  ensureSinbixProject,
  runSinbixCommandAsync,
  sinbixDepsInstall,
} from '@sinbix/plugin/testing';

describe('plugins-common e2e', () => {
  const project = 'plugins-common';

  beforeAll(async () => {
    await ensureSinbixProject(project);
    await sinbixDepsInstall(project, [
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
      checkFilesExist(project, [
        `apps/demo/.gitkeep`,
        `apps/test/demo/.gitkeep`,
      ])
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
      checkFilesExist(project, [
        `apps/demo/.gitkeep`,
        `apps/test/demo/.gitkeep`,
      ])
    ).toThrow();

    expect(() =>
      checkFilesExist(project, [
        `libs/test/demo/.gitkeep`,
        `libs/demo/.gitkeep`,
      ])
    ).not.toThrow();

    done();
  });

  it('should remove libs-demo', async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:remove libs-demo`
    );

    expect(() => checkFilesExist(project, [`libs/demo/.gitkeep`])).toThrow();

    done();
  });
});
