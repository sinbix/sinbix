import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { ProjectGraphNode } from '@sinbix/core';
import { GraphStore, GraphState } from './graph.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC,
})
export class GraphQuery extends QueryEntity<GraphState, ProjectGraphNode> {
  dependencies$ = this.select((graph) => graph.dependencies);

  affected$ = this.select((graph) => graph.affected);

  exclude$ = this.select((graph) => graph.exclude);

  focusedProject$ = this.select((graph) => graph.focusedProject);

  projectGroups$ = this.selectAll().pipe(
    map((projects) => {
      return this.groupProjectsByDirectory(projects);
    })
  );

  constructor(protected store: GraphStore) {
    super(store);
  }

  getProjectNames() {
    return this.getAll().map((project) => project.name);
  }

  private groupProjectsByDirectory(projects) {
    let groups = {};

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
