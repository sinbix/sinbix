import { Injectable } from '@angular/core';
import { ProjectGraphNode } from '@sinbix/core';
import { ProjectsState } from '@sinbix/apps/deps-graph/interfaces';

import {
  StoreConfig,
  EntityState,
  EntityStore,
  MultiActiveState,
} from '@datorama/akita';

const initialState = { active: [] };

@Injectable()
@StoreConfig({ name: 'projects', idKey: 'name' })
export class ProjectsStore extends EntityStore<
  ProjectsState,
  ProjectGraphNode
> {
  constructor() {
    super(initialState);
  }
}
