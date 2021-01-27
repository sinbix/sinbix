import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/common/testing';

describe('node e2e', () => {
  const projectId = 'node';
  const libName = 'lib-publishable';
  const directory = 'libs';

  beforeAll(() => {
    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/node',
          project: projectId,
        },
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/common',
          project: 'common',
        },
      ],
    });
  });

  it(`should generate ${libName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library ${libName} --directory=${directory} --publishable --importPath=@${projectId}/${libName}`,
      project: projectId,
    });

    expect(() =>
      checkFilesExist({
        project: projectId,
        expectedPaths: [`${directory}/${libName}/package.json`],
      })
    ).not.toThrow();

    done();
  });

  it(`should lint ${libName}`, async (done) => {
    const lint = await runSinbixCommandAsync({
      command: `lint ${libName}`,
      project: projectId,
    });

    expect(lint.stdout).toContain('All files pass linting');

    done();
  });

  it(`should test ${libName}`, async (done) => {
    const test = await runSinbixCommandAsync({
      command: `test ${libName}`,
      project: projectId,
    });

    expect(test.stdout).toContain('No tests found');

    done();
  });

  it(`should build ${libName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `build ${libName}`,
      project: projectId,
    });

    expect(() =>
      checkFilesExist({
        project: projectId,
        expectedPaths: [`dist/${directory}/${libName}/package.json`],
      })
    ).not.toThrow();

    done();
  });
});
