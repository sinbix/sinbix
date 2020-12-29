import { TargetDefinition } from '@angular-devkit/core/src/workspace';

export interface ProjectSchematicSchema {
  name: string;
  tags?: string;
  type: string;
  sourceRoot?: string;
  targets?: ({ name: string } & TargetDefinition)[];
}
