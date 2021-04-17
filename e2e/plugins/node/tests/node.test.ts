import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  checkFilesExist,
  sinbixDepsInstall,
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/core/plugin-utils';

describe('plugins-node e2e', () => {
  const project = 'plugins-node';
  const packageName = 'package';
  const packageDirectory = 'packages';
  const packagePath = `${packageDirectory}/${packageName}`;
  const gPackageName = normalizeProjectName(packagePath);
  const movedPackagePath = `${packageDirectory}/moved/${packageName}`;
  const gMovedPackageName = normalizeProjectName(movedPackagePath);

  const emptyPackageName = `${packageName}-empty`;
  const emptyPackagePath = `${packageDirectory}/${emptyPackageName}`;
  const gEmptyPackageName = normalizeProjectName(emptyPackagePath);
  const movedEmptyPackagePath = `${packageDirectory}/moved/${emptyPackageName}`;
  const gMovedEmptyPackageName = normalizeProjectName(movedEmptyPackagePath);

  const libName = 'lib';
  const libDirectory = 'libs';
  const libPath = `${libDirectory}/${libName}`;
  const gLibName = normalizeProjectName(libPath);

  const movedLibPath = `${libDirectory}/moved/${libName}`;
  const gMovedLibName = normalizeProjectName(movedLibPath);

  beforeAll(async () => {
    await ensureSinbixProject(project);

    await sinbixDepsInstall(project, [
      {
        npmPackageName: '@sinbix/common',
        distPath: 'dist/plugins/common',
        projectName: 'plugins-common',
      },
      {
        npmPackageName: '@sinbix/node',
        distPath: 'dist/plugins/node',
        projectName: 'plugins-node',
      },
    ]);
  });

  it(`should generate ${packagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${packageName} --directory=${packageDirectory} --publishable --importPath=@${project}/moved/${packageName} --main=index.ts`
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

  it(`should move ${gPackageName} to ${movedPackagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=${gPackageName} ${movedPackagePath} --importPath=@${project}/${gMovedPackageName}`
    );

    expect(() => checkFilesExist(project, [packagePath])).toThrow();
    expect(() => checkFilesExist(project, [movedPackagePath])).not.toThrow();

    done();
  });

  it(`should remove ${gMovedPackageName}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:remove --project=${gMovedPackageName}`
    );

    expect(() => checkFilesExist(project, [movedPackagePath])).toThrow();

    done();
  });

  it(`should generate ${emptyPackagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${emptyPackageName} --directory=${packageDirectory} --publishable --importPath=@${project}/${emptyPackageName}`
    );

    expect(() =>
      checkFilesExist(project, [
        `${packageDirectory}/${emptyPackageName}/package.json`,
      ])
    ).not.toThrow();

    done();
  });

  it(`should build-base ${gEmptyPackageName}`, async (done) => {
    await runSinbixCommandAsync(project, `build-base ${gEmptyPackageName}`);

    expect(() =>
      checkFilesExist(project, [`dist/${emptyPackagePath}/package.json`])
    ).not.toThrow();

    done();
  });

  it(`should move ${gEmptyPackageName} to ${movedEmptyPackagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=${gEmptyPackageName} ${movedEmptyPackagePath} --updateImportPath=false`
    );

    expect(() => checkFilesExist(project, [emptyPackagePath])).toThrow();

    expect(() =>
      checkFilesExist(project, [movedEmptyPackagePath])
    ).not.toThrow();

    done();
  });

  it(`should move ${gMovedEmptyPackageName} to ${emptyPackagePath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=${gMovedEmptyPackageName} ${emptyPackagePath}`
    );

    expect(() => checkFilesExist(project, [movedEmptyPackagePath])).toThrow();

    expect(() => checkFilesExist(project, [emptyPackagePath])).not.toThrow();

    done();
  });

  it(`should remove ${gEmptyPackageName}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:remove --project=${gEmptyPackageName}`
    );

    expect(() => checkFilesExist(project, [emptyPackagePath])).toThrow();

    done();
  });

  it(`should generate ${libPath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/node:library ${libName} --directory=${libDirectory} --main=demo/index.ts`
    );

    expect(() => checkFilesExist(project, [libPath])).not.toThrow();

    done();
  });

  it(`should move ${gLibName} to ${movedLibPath}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:move --project=${gLibName} ${movedLibPath}`
    );

    expect(() => checkFilesExist(project, [libPath])).toThrow();

    expect(() => checkFilesExist(project, [movedLibPath])).not.toThrow();

    done();
  });

  it(`should remove ${gMovedLibName}`, async (done) => {
    await runSinbixCommandAsync(
      project,
      `generate @sinbix/common:remove ${gMovedLibName}`
    );

    expect(() => checkFilesExist(project, [movedLibPath])).toThrow();

    done();
  });
});
