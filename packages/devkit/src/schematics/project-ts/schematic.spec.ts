import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path'

import { ProjectTsSchematicSchema } from './schema';
import { createEmptyWorkspace } from "../../workspace/utils/testing-utils";

describe('project-ts schematic', () => {
  let appTree: Tree;
  const options: ProjectTsSchematicSchema = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/project-ts',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'project-ts',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
