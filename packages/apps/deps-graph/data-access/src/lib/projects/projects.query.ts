import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { ProjectGraphNode } from '@sinbix/core';
import { ProjectsState } from '@sinbix/apps/deps-graph/interfaces';
import { ProjectsStore } from './projects.store';

@Injectable()
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
