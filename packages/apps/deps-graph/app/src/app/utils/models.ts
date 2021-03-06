import { ProjectGraph, ProjectGraphNode } from '@sinbix/core';

export interface GraphModel {
  projects: ProjectGraphNode[];
  graph: ProjectGraph;
  filteredProjects: ProjectGraphNode[];
  affected: string[];
  exclude: string[];
  focusedProject: string;
}
