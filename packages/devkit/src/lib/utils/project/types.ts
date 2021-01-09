import { ProjectType } from "../../../workspace/utils/project-type";

export interface BaseProjectSchema {
  name: string;
  tags?: string;
}

export interface ProjectRuleSchema extends BaseProjectSchema {
  type: string;
}

export interface ProjectConfig{
  name: string;
  root: string;
  projectType: ProjectType;
}
