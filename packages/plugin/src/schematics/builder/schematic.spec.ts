import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { BuilderSchematicOptions } from './schema';

describe('builder schematic', () => {
  let appTree: Tree;
  const options: BuilderSchematicOptions = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/builder',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'builder',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
