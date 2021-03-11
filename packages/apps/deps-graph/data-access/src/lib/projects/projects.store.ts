import { Injectable } from '@angular/core';
import { ProjectGraph, ProjectGraphNode } from '@sinbix/core';
import { EntityState, MultiActiveState } from '@datorama/akita';
import { StoreConfig, EntityStore } from '@datorama/akita';

export interface ProjectsState
  extends EntityState<ProjectGraphNode>,
    MultiActiveState {
  graph: ProjectGraph;
  affected: string[];
  exclude: string[];
  focusedProject: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects', idKey: 'name' })
export class ProjectsStore extends EntityStore<
  ProjectsState,
  ProjectGraphNode
> {
  constructor() {
    super(createInitialState());
  }
}

function createInitialState(): ProjectsState {
  return {
    active: [],
    affected: [],
    exclude: [],
    focusedProject: null,
    graph: null,
  };
}
