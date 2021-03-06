import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { ProjectGraphNode } from '@sinbix/core';
import { DepGraphStore, DepGraphState } from './dep-graph.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC,
})
export class DepGraphQuery extends QueryEntity<DepGraphState, ProjectGraphNode> {
  dependencies$ = this.select((graph) => graph.dependencies);

  affected$ = this.select((graph) => graph.affected);

  exclude$ = this.select((graph) => graph.exclude);

  focused$ = this.select((graph) => graph.focused);

  projectGroups$ = this.selectAll().pipe(
    map((projects) => {
      return this.groupProjectsByDirectory(projects);
    })
  );

  constructor(protected store: DepGraphStore) {
    super(store);
  }

  getProjectNames() {
    return this.getAll().map((project) => project.name);
  }

  private groupProjectsByDirectory(projects) {
    const groups = {};

    projects.forEach((project) => {
      const split = project.data.root.split('/');
      const directory = split.slice(0, -1).join('/');

      if (!groups.hasOwnProperty(directory)) {
        groups[directory] = [];
      }
      groups[directory].push(project.name);
    });

    return groups;
  }
}
