import { ProjectGraph, ProjectGraphNode } from '@sinbix/core';

export interface IGraphModel {
  projects: ProjectGraphNode[];
  graph: ProjectGraph;
  filteredProjects: ProjectGraphNode[];
  affected: string[];
  exclude: string[];
  focusedProject: string;
}
