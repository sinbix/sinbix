import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { NewSchematicSchema } from './schema';

describe('new schematic', () => {
  let appTree: Tree;
  const options: NewSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/new',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'new',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
