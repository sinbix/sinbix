import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/common';

describe('plugin e2e', () => {
  const projectId = 'plugin';
  const plugin = 'plugin';
  const generatedPluginName = normalizeProjectName(`plugins-${plugin}`);

  beforeAll(() => {
    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/common',
          project: 'common',
        },
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/node',
          project: 'node',
        },
        {
          npmPackageName: '@sinbix/plugin',
          distPath: 'dist/packages/plugin',
          project: 'plugin',
        },
      ],
    });
  });

  it(`should generate plugin ${plugin}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:project ${plugin} --importPath=@${projectId}/${generatedPluginName}`,
      project: projectId,
    });

    done();
  });

  it(`should e2e ${generatedPluginName}`, async (done) => {
    const result = await runSinbixCommandAsync({
      command: `e2e e2e-${generatedPluginName}`,
      project: projectId,
    });

    // expect(result.stdout).toContain('out');
    expect(result.stderr).toContain('err kljklkj');

    // expect(() =>
    //   checkFilesExist({
    //     project: projectId,
    //     expectedPaths: [`dist/${libPath}/package.json`],
    //   })
    // ).not.toThrow();

    done();
  });

  // it(`should generate schematic for plugin ${generatedPluginName}`, async (done) => {
  //   await runSinbixCommandAsync({
  //     command: `generate @sinbix/plugin:schematic schematic --project=${generatedPluginName}`,
  //     project: projectId,
  //   });
  //
  //   done();
  // });
  //
  // it(`should generate builder for plugin ${generatedPluginName}`, async (done) => {
  //   await runSinbixCommandAsync({
  //     command: `generate @sinbix/plugin:builder builder --project=${generatedPluginName}`,
  //     project: projectId,
  //   });
  //
  //   done();
  // });
});
