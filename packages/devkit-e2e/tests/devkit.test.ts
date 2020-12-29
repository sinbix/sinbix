import {
  ensureSinbixProject,
  runSinbixCommandAsync,
  uniq,
} from '@sinbix/devkit/testing';

describe('devkit e2e', () => {
  it('should create devkit', async (done) => {
    const project = 'devkit';

    ensureSinbixProject({
      npmPackageName: '@sinbix/devkit',
      pluginDistPath: 'dist/packages/devkit',
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/devkit:type package --directory=packages`,
      project
    })

    await runSinbixCommandAsync({
      command: `generate @sinbix/devkit:type app --directory=apps`,
      project
    })

    await runSinbixCommandAsync({
      command: `generate @sinbix/devkit:type lib --directory=libs`,
      project
    })

    await runSinbixCommandAsync({
      command: `generate @sinbix/devkit:type e2e`,
      project
    })

    // const plugin = uniq(project);

    // await runSinbixCommandAsync({
    //   command: `generate @sinbix/devkit:type ${plugin}`,
    //   project,
    // });
    //
    // await runSinbixCommandAsync({
    //   command: `generate @sinbix/devkit:type --tags custom-tag ${plugin}-perf`,
    //   project,
    // });

    // console.log(customTag.stdout);

    // const result = await runNxCommandAsync(`build ${plugin}`);
    // expect(result.stdout).toContain('Builder ran');

    done();
  });
  // it('should create devkit', async (done) => {
  //   const plugin = uniq('devkit');
  //   ensureNxProject('@sinbix/devkit', 'dist/packages/devkit');
  //   await runNxCommandAsync(`generate @sinbix/devkit:devkit ${plugin}`);
  //
  //   const result = await runNxCommandAsync(`build ${plugin}`);
  //   expect(result.stdout).toContain('Builder ran');
  //
  //   done();
  // });

  // describe('--directory', () => {
  //   it('should create src in the specified directory', async (done) => {
  //     const plugin = uniq('devkit');
  //     ensureNxProject('@sinbix/devkit', 'dist/packages/devkit');
  //     await runNxCommandAsync(
  //       `generate @sinbix/devkit:devkit ${plugin} --directory subdir`
  //     );
  //     expect(() =>
  //       checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
  //     ).not.toThrow();
  //     done();
  //   });
  // });
  //
  // describe('--tags', () => {
  //   it('should add tags to nx.json', async (done) => {
  //     const plugin = uniq('devkit');
  //     ensureNxProject('@sinbix/devkit', 'dist/packages/devkit');
  //     await runNxCommandAsync(
  //       `generate @sinbix/devkit:devkit ${plugin} --tags e2etag,e2ePackage`
  //     );
  //     const nxJson = readJson('nx.json');
  //     expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
  //     done();
  //   });
  // });
});
