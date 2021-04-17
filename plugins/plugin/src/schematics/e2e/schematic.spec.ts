import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@sinbix/core/plugin-utils';
import { join } from 'path'

import { E2eSchematicOptions } from './utils';

describe('e2e schematic', () => {
  let appTree: Tree;
  const options: E2eSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/e2e',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'e2e',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
