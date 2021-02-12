import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { PluginsWebSchematicSchema } from './schema';

describe('plugins-web schematic', () => {
  let appTree: Tree;
  const options: PluginsWebSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/plugins-web',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('plugins-web', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
