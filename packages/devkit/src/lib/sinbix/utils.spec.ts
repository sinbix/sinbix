import { Tree } from "@angular-devkit/schematics";
import { LintSchematicSchema } from "../../schematics/lint/schema";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { join } from "path";
import { createEmptyWorkspace } from "@nrwl/workspace/testing";
import { getSinbix } from "./utils";

describe('lint schematic', () => {
  let appTree: Tree;
  const options: LintSchematicSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(getSinbix())
  })
});
