import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { ProjectSchematicSchema } from './schema';

describe('devkit schematic', () => {
  let appTree: Tree;
  const options: ProjectSchematicSchema = { name: 'test' };

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
