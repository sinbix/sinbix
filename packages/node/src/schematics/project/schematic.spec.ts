import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { ProjectSchematicOptions } from './utils';

describe('project schematic', () => {
  let appTree: Tree;
  const options: ProjectSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/project',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'project',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
