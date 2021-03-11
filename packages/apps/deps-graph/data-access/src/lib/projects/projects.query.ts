import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { ProjectGraphNode } from '@sinbix/core';
import { ProjectsStore, ProjectsState } from './projects.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC,
})
export class ProjectsQuery extends QueryEntity<
  ProjectsState,
  ProjectGraphNode
> {
  constructor(protected store: ProjectsStore) {
    super(store);
  }
}
