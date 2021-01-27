import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/plugin/testing';

describe('plugin e2e', () => {
  const projectId = 'plugin';
  const libName = 'plugin';

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

  it(`should generate plugin ${libName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library ${libName} --directory=libs --publishable --importPath=@${projectId}/${libName}`,
      project: projectId,
    });

    done();
  });

  it(`should generate schematic for plugin ${libName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/plugin:schematic schematic --project=${libName}`,
      project: projectId,
    });

    done();
  });
});
