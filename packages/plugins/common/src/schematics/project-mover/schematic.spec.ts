import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path'

import { ProjectMoverSchematicOptions } from './utils';

describe('project-mover schematic', () => {
  let appTree: Tree;
  const options: ProjectMoverSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/project-mover',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'project-mover',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
