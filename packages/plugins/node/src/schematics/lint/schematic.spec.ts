import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { LintSchematicOptions } from './utils';

describe('lint schematic', () => {
  let appTree: Tree;
  const options: LintSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/lint',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'lint',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
