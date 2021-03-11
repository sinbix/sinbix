import { ProjectGraph, ProjectGraphNode } from '@sinbix/core';

export interface GraphState {
  graph: ProjectGraph;
  affected: string[];
  exclude: string[];
  focusedProject: string;
}
