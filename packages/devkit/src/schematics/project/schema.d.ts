import { TargetDefinition } from '@angular-devkit/core/src/workspace';
import { ProjectType } from "../../workspace";

export interface ProjectSchematicSchema {
  name: string;
  directory?: string;
  type?: ProjectType;
  tags?: string;
  sourceRoot?: string;
  targets?: ({ name: string } & TargetDefinition)[];
}
