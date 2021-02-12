import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('plugins-web e2e', () => {
  it('should create plugins-web', async (done) => {
    const plugin = uniq('plugins-web');
    ensureNxProject('@sinbix/plugins/web', 'dist/packages/plugins/web');
    await runNxCommandAsync(
      `generate @sinbix/plugins/web:plugins-web ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('plugins-web');
      ensureNxProject('@sinbix/plugins/web', 'dist/packages/plugins/web');
      await runNxCommandAsync(
        `generate @sinbix/plugins/web:plugins-web ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('plugins-web');
      ensureNxProject('@sinbix/plugins/web', 'dist/packages/plugins/web');
      await runNxCommandAsync(
        `generate @sinbix/plugins/web:plugins-web ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
