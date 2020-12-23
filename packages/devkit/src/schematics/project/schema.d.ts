import { ProjectType } from "@nrwl/workspace";
import { Dictionary } from "lodash";
import { TargetDefinition } from "@angular-devkit/core/src/workspace";

export interface ProjectSchematicSchema {
  name: string;
  tags?: string;
  type: ProjectType;
  prefixTags?: string;
  rootDir?: string;
  targets?: Dictionary<{name: string} & TargetDefinition>;
}
