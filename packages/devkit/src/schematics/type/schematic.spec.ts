import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path'

import { TypeSchematicSchema } from './schema';
import { createEmptyWorkspace } from "../../workspace/utils/testing-utils";

describe('type schematic', () => {
  let appTree: Tree;
  const options: TypeSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@sinbix/type',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(testRunner.runSchematicAsync(
        'type',
        options,
        appTree
      ).toPromise()
    ).resolves.not.toThrowError();
  })
});
