import { Injectable } from '@angular/core';
import { GraphQuery } from './graph.query';
import { GraphStore } from './graph.store';
import { IGraphModel } from '@sinbix/apps/deps-graph/interfaces';

@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private store: GraphStore, private query: GraphQuery) {}

  setGraph(graph: IGraphModel) {
    const {
      projects,
      dependencies,
      affected,
      exclude,
      focusedProject,
      active,
    } = graph;

    this.store.update({
      dependencies,
      affected,
      exclude,
      focusedProject,
      active,
    });
    this.store.set(projects);

    // console.log(this.query.getValue().dependencies);
  }

  toggleActive(projectName: string) {
    this.store.toggleActive(projectName);
  }

  select(...projectNames: string[]) {
    this.store.addActive(projectNames);
  }

  deselect(...projectNames: string[]) {
    this.store.removeActive(projectNames);
  }
}
