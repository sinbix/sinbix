import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist
} from '@sinbix/common/testing';

describe('node e2e', () => {
  it('should create node', async (done) => {
    const projectId = 'node';

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

    const libName = 'lib-publishable';

    await runSinbixCommandAsync({
      command: `generate @sinbix/node:library ${libName} --directory=libs --publishable --importPath=@${projectId}/${libName}`,
      project: projectId,
    });

    const lint = await runSinbixCommandAsync({
      command: `lint ${libName}`,
      project: projectId,
    });

    expect(lint.stdout).toContain('All files pass linting');

    const test = await runSinbixCommandAsync({
      command: `test ${libName}`,
      project: projectId,
    });

    expect(test.stdout).toContain('No tests found');

    const build = await runSinbixCommandAsync({
      command: `build ${libName}`,
      project: projectId,
    });

    expect(() =>
      checkFilesExist({project: projectId, expectedPaths: [`dist/libs/${libName}/package.json`]})
    ).not.toThrow();

    done();
  });
});
