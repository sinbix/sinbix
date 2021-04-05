import { Injectable } from '@angular/core';
import { ProjectGraphDependency, ProjectGraphNode } from '@sinbix/core';
import { EntityState, MultiActiveState } from '@datorama/akita';
import { StoreConfig, EntityStore } from '@datorama/akita';

export interface DepGraphState
  extends EntityState<ProjectGraphNode>,
    MultiActiveState {
  dependencies: ProjectGraphDependency[];
  affected: string[];
  exclude: string[];
  focused: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dep-graph', idKey: 'name' })
export class DepGraphStore extends EntityStore<
  DepGraphState,
  ProjectGraphNode
> {
  constructor() {
    super(createInitialState());
  }
}

function createInitialState(): DepGraphState {
  return {
    active: [],
    dependencies: [],
    affected: [],
    exclude: [],
    focused: null,
  };
}
