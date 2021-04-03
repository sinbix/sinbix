import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  sinbixDepsInstall,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/utils';

describe('plugin e2e', () => {
  const project = 'plugins-plugin';
  const plugin = 'plugin';
  const generatedPluginName = normalizeProjectName(`plugins-${plugin}`);

  beforeAll(async () => {
    await ensureSinbixProject(project);

    await sinbixDepsInstall(project, [
      {
        npmPackageName: '@sinbix/common',
        distPath: 'dist/packages/plugins/common',
        projectName: 'plugins-common',
      },
      {
        npmPackageName: '@sinbix/node',
        distPath: 'dist/packages/plugins/node',
        projectName: 'plugins-node',
      },
      {
        npmPackageName: '@sinbix/plugin',
        distPath: 'dist/packages/plugins/plugin',
        projectName: 'plugins-plugin',
      },
    ]);
  });

  it(`should generate plugin ${plugin}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/plugin:project ${plugin} --importPath=@${project}/${plugin}`
    );

    done();
  });

  it(`should e2e ${generatedPluginName}`, async (done) => {
    const result = await runSinbixCommandAsync(
      project,
      `e2e e2e-${generatedPluginName}`
    );

    expect(result.stderr).toContain(`PASS e2e-${generatedPluginName}`);

    done();
  });

  const notInitializedPlugin = 'not-initialized-plugin';

  it(`should generate plugin ${notInitializedPlugin}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/plugin:project ${notInitializedPlugin} --importPath=@${project}/${notInitializedPlugin} --skipInit`
    );

    done();
  });
});
