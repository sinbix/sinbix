import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { MoveSchematicOptions } from './utils/models';

describe('move schematic', () => {
  let appTree: Tree;
  const options: MoveSchematicOptions = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/move',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'move',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
