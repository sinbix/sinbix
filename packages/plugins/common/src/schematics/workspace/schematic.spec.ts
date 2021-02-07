import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

import { WorkspaceSchematicOptions } from './utils';
import { createEmptyWorkspace } from '@sinbix/utils';

describe('sinbix schematic', () => {
  let appTree: Tree;
  const options: WorkspaceSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    'sinbix',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('sinbix', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
