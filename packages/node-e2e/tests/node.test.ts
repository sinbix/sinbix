import {
  ensureSinbixProject,
  runSinbixCommandAsync,
} from '@sinbix/common/testing';

describe('node e2e', () => {
  it('should create node', async (done) => {
    const project = 'node';

    ensureSinbixProject({
      npmPackageName: '@sinbix/node',
      pluginDistPath: 'dist/packages/node',
      project,
    });

    await runSinbixCommandAsync({
      command: `generate @sinbix/node:project test2/demo --directory=apps --type=application`,
      project
    })

    done();
  });
});
