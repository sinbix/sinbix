import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path'

import { BuilderSchematicOptions } from './utils';
import { createEmptyWorkspace } from "@sinbix/utils";

describe('builder schematic', () => {
  let appTree: Tree;
  const options: BuilderSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/builder',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'builder',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
