import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path'

import { SinbixSchematicSchema } from './schema';
import { createEmptyWorkspace } from "../../workspace/utils/testing-utils";

describe('sinbix schematic', () => {
  let appTree: Tree;
  const options: SinbixSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/sinbix',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'sinbix',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
