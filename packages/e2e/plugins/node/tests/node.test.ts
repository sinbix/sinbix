import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
  sinbixDepsInstall,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/utils';

describe('plugins-node e2e', () => {
  const project = 'plugins-node';
  const packageName = 'package';
  const packageDirectory = 'packages';
  const packagePath = `${packageDirectory}/${packageName}`;
  const gPackageName = normalizeProjectName(packagePath);

  const libName = 'lib';
  const libDirectory = 'libs';
  const libPath = `${libDirectory}/${libName}`;
  const gLibName = normalizeProjectName(libPath);

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
    ]);
  });

  it(`should generate ${packagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${packageName} --directory=${packageDirectory} --publishable --importPath=@${project}/${packageName}`
    );

    expect(() =>
      checkFilesExist(project, [
        `${packageDirectory}/${packageName}/package.json`,
      ])
    ).not.toThrow();

    done();
  });

  it(`should lint ${gPackageName}`, async (done) => {
    const lint = await runSinbixCommandAsync(project, `lint ${gPackageName}`);

    expect(lint.stdout).toContain('All files pass linting');

    done();
  });

  it(`should test ${gPackageName}`, async (done) => {
    const test = await runSinbixCommandAsync(project, `test ${gPackageName}`);

    expect(test.stdout).toContain('No tests found');

    done();
  });

  it(`should build-base ${gPackageName}`, async (done) => {
    await runSinbixCommandAsync(project, `build-base ${gPackageName}`);

    expect(() =>
      checkFilesExist(project, [`dist/${packagePath}/package.json`])
    ).not.toThrow();

    done();
  });

  it(`should generate ${libPath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${libName} --directory=${libDirectory}`
    );

    expect(() =>
      checkFilesExist(project, [`${libDirectory}/${libName}`])
    ).not.toThrow();

    done();
  });

  it(`should remove ${gLibName}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:remove ${gLibName}`
    );

    // expect(() => checkFilesExist(project, [`libs/demo/.gitkeep`])).toThrow();

    done();
  });
});
