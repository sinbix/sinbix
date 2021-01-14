import { TargetDefinition } from "@angular-devkit/core/src/workspace";
import { ProjectType } from "../../workspace";


export interface ProjectTsSchematicSchema {
  name: string;
  tags?: string;
  type?: ProjectType;
  sourceRoot?: string;
  targets?: ({ name: string } & TargetDefinition)[];
}
