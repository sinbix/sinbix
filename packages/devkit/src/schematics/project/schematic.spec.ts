import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

import { ProjectSchematicSchema } from './schema';
import { createEmptyWorkspace } from "../../workspace/utils/testing-utils";

describe('devkit schematic', () => {
  let appTree: Tree;
  const options: ProjectSchematicSchema = { name: 'test', type: 'library' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/devkit',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('devkit', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
