import { Injectable } from '@angular/core';
import { ProjectGraphDependency, ProjectGraphNode } from '@sinbix/core';
import { EntityState, MultiActiveState } from '@datorama/akita';
import { StoreConfig, EntityStore } from '@datorama/akita';

export interface GraphState
  extends EntityState<ProjectGraphNode>,
    MultiActiveState {
  dependencies: ProjectGraphDependency[];
  affected: string[];
  exclude: string[];
  focusedProject: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'graph', idKey: 'name' })
export class GraphStore extends EntityStore<GraphState, ProjectGraphNode> {
  constructor() {
    super(createInitialState());
  }
}

function createInitialState(): GraphState {
  return {
    active: [],
    dependencies: [],
    affected: [],
    exclude: [],
    focusedProject: null,
  };
}
