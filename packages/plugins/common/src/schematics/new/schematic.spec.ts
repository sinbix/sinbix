import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { NewSchematicOptions } from './schema';
import { createEmptyWorkspace } from '@sinbix/utils';

describe('new schematic', () => {
  let appTree: Tree;
  const options: NewSchematicOptions = null;

  const testRunner = new SchematicTestRunner(
    '@sinbix/new',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('new', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
