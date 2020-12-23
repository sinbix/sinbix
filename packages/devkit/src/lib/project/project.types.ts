import { ProjectType } from "@nrwl/workspace";
import { Dictionary } from 'lodash';
import { TargetDefinition } from "@angular-devkit/core/src/workspace";

export interface BaseProjectSchema {
  name: string;
  tags?: string;
}

export interface ProjectRuleSchema extends BaseProjectSchema {
  type: ProjectType;
  prefixTags?: string[];
  rootDir?: string;
  targets?: Dictionary<{name: string} & TargetDefinition>;
}

export interface ProjectSchema extends ProjectRuleSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  projectTags: Set<string>;
  offsetFromRoot: string;
}
