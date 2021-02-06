import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/common';

describe('plugin e2e', () => {
  const projectId = 'plugins-plugin';
  const plugin = 'plugin';
  const generatedPluginName = normalizeProjectName(`plugins-${plugin}`);

  beforeAll(() => {
    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/plugins/common',
          project: 'plugins-common',
        },
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/plugins/node',
          project: 'plugins-node',
        },
        {
          npmPackageName: '@sinbix/plugin',
          distPath: 'dist/packages/plugins/plugin',
          project: 'plugins-plugin',
        },
      ],
    });
  });

  it(`should generate plugin ${plugin}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:project ${plugin} --importPath=@${projectId}/${plugin}`,
      project: projectId,
    });

    done();
  });

  it(`should e2e ${generatedPluginName}`, async (done) => {
    const result = await runSinbixCommandAsync({
      command: `e2e e2e-${generatedPluginName}`,
      project: projectId,
    });

    expect(result.stderr).toContain(`PASS e2e-${generatedPluginName}`);

    done();
  });

  const notInitializedPlugin = 'not-initialized-plugin';

  it(`should generate plugin ${notInitializedPlugin}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:project ${notInitializedPlugin} --importPath=@${projectId}/${notInitializedPlugin} --skipInit`,
      project: projectId,
    });

    done();
  });
});