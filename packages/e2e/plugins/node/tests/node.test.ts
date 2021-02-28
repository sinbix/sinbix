import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/utils';

describe('plugins-node e2e', () => {
  const project = 'plugins-node';
  const libName = 'lib-publishable';
  const directory = 'packages';

  const libPath = `${directory}/${libName}`;
  const generatedLibName = normalizeProjectName(libPath);

  beforeAll(async () => {
    await ensureSinbixProject(project, [
      {
        npmPackageName: '@sinbix/node',
        distPath: 'dist/packages/plugins/node',
        projectName: project,
      },
      {
        npmPackageName: '@sinbix/common',
        distPath: 'dist/packages/plugins/common',
        projectName: 'plugins-common',
      },
    ]);
  });

  it(`should generate ${libPath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${libName} --directory=${directory} --publishable --importPath=@${project}/${libName}`
    );

    expect(() =>
      checkFilesExist({
        project: project,
        expectedPaths: [`${directory}/${libName}/package.json`],
      })
    ).not.toThrow();

    done();
  });

  it(`should lint ${generatedLibName}`, async (done) => {
    const lint = await runSinbixCommandAsync(
      project,
      `lint ${generatedLibName}`
    );

    // expect(lint.stdout).toContain('All files pass linting');

    done();
  });

  it(`should test ${generatedLibName}`, async (done) => {
    const test = await runSinbixCommandAsync(
      project,
      `test ${generatedLibName}`
    );

    // expect(test.stdout).toContain('No tests found');

    done();
  });

  it(`should build-base ${generatedLibName}`, async (done) => {
    await runSinbixCommandAsync(project, `build-base ${generatedLibName}`);

    expect(() =>
      checkFilesExist({
        project: project,
        expectedPaths: [`dist/${libPath}/package.json`],
      })
    ).not.toThrow();

    done();
  });
});
