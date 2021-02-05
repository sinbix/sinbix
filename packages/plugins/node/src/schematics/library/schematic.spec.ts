import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { LibrarySchematicOptions } from './utils';

describe('library schematic', () => {
  let appTree: Tree;
  const options: LibrarySchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/library',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'library',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
