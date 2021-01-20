import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { JestSchematicSchema } from './schema';

describe('jest schematic', () => {
  let appTree: Tree;
  const options: JestSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/jest',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'jest',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
