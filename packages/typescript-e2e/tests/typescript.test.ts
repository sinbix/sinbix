import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/common/testing';

describe('typescript e2e', () => {
  it('should create typescript', async (done) => {
    const project = 'typescript';

    ensureSinbixProject({
      npmPackageName: '@sinbix/typescript',
      pluginDistPath: 'dist/packages/typescript',
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/typescript:project test2/demo --directory=apps --type=application`,
      project
    })

    done();
  });
});
