import {
  ensureSinbixProject,
  runSinbixCommandAsync
} from '@sinbix/plugin/testing';
import { normalizeProjectName } from '@sinbix/common';

describe('pattern e2e', () => {
  const projectId = 'pattern';
  const pattern = 'pattern';
  const generatedPatternName = normalizeProjectName(`${pattern}`);

  beforeAll(() => {
    ensureSinbixProject(projectId, {
      deps: [
        {
          npmPackageName: '@npm/pattern',
          distPath: 'dist/path/pattern',
          project: 'patter',
        },
      ],
    });
  });

  it(`should generate ${generatedPatternName}`, async (done) => {
    await runSinbixCommandAsync({
      command: `generate @npm/pattern:pattern ${pattern}`,
      project: projectId,
    });

    done();
  });
});
