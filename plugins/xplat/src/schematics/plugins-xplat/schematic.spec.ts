import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { PluginsXplatSchematicSchema } from './schema';

describe('plugins-xplat schematic', () => {
  let appTree: Tree;
  const options: PluginsXplatSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/plugins-xplat',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('plugins-xplat', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });
});
