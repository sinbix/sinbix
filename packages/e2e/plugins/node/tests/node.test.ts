import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from "@sinbix/utils";

describe('plugins-node e2e', () => {
  const projectId = 'plugins-node';
  const libName = 'lib-publishable';
  const directory = 'packages';

  const libPath = `${directory}/${libName}`;
  const generatedLibName = normalizeProjectName(libPath);

  beforeAll(() => {
    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@sinbix/node',
          distPath: 'dist/packages/plugins/node',
          project: projectId,
        },
        {
          npmPackageName: '@sinbix/common',
          distPath: 'dist/packages/plugins/common',
          project: 'plugins-common',
        },
      ],
    });
  });

  it(`should generate ${libPath}`, async (done) => {
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

  it(`should lint ${generatedLibName}`, async (done) => {
    const lint = await runSinbixCommandAsync({
      command: `lint ${generatedLibName}`,
      project: projectId,
    });

    expect(lint.stdout).toContain('All files pass linting');

    done();
  });

  it(`should test ${generatedLibName}`, async (done) => {
    const test = await runSinbixCommandAsync({
      command: `test ${generatedLibName}`,
      project: projectId,
    });

    expect(test.stdout).toContain('No tests found');

    done();
  });

  it(`should build ${generatedLibName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `build ${generatedLibName}`,
      project: projectId,
    });

    expect(() =>
      checkFilesExist({
        project: projectId,
        expectedPaths: [`dist/${libPath}/package.json`],
      })
    ).not.toThrow();

    done();
  });
});
