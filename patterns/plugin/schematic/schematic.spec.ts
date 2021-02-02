import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { PatternSchematicOptions } from './utils';

describe('pattern schematic', () => {
  let appTree: Tree;
  const options: PatternSchematicOptions = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@<%= npmScope %>/<%= name %>',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('<%= fileName %>', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });
});
