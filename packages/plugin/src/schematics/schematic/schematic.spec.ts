import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@sinbix/common';
import { join } from 'path'

import { SchematicSchematicOptions } from './utils';

describe('schematic schematic', () => {
  let appTree: Tree;
  const options: SchematicSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/schematic',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'schematic',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
