import { ProjectGraphDependency, ProjectGraphNode } from '@sinbix/core';

export interface IGraphModel {
  projects: ProjectGraphNode[];
  active: string[];
  dependencies: ProjectGraphDependency[];
  affected: string[];
  exclude: string[];
  focused: string;
}
