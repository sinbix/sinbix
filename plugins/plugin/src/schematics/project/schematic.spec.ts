import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@sinbix/utils';
import { join } from 'path';

import { ProjectSchematicOptions } from './utils';

describe('plugin schematic', () => {
  let appTree: Tree;
  const options: ProjectSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/plugin',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('plugin', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
