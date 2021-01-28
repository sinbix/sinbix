import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/plugin/testing';

describe('plugin e2e', () => {
  const projectId = 'plugin';
  const plugin = 'plugin';

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
          project: projectId,
        },
        {
          npmPackageName: '@sinbix/plugin',
          distPath: 'dist/packages/plugin',
          project: projectId,
        },
      ],
    });
  });

  it(`should generate plugin ${plugin}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:plugin ${plugin} --directory=plugins --importPath=@${projectId}/${plugin}`,
      project: projectId,
    });

    done();
  });

  it(`should generate schematic for plugin ${plugin}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:schematic schematic --project=${plugin}`,
      project: projectId,
    });

    done();
  });
});
