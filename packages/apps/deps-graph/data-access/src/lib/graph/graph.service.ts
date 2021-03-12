import { Injectable } from '@angular/core';
import { GraphQuery } from './graph.query';
import { GraphStore } from './graph.store';
import {
  IGraphModel,
  ISearchFilterForm,
} from '@sinbix/apps/deps-graph/interfaces';

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

  filterProjectsByText(searchFilter: ISearchFilterForm) {
    const { search, includeInPath } = searchFilter;

    const projects = this.query.getProjectNames();

    this.deselect(...projects);

    const split = search
      .toLowerCase()
      .split(',')
      .map((splitItem) => splitItem.trim());

    const matchedProjects = projects.filter(
      (project) =>
        split.findIndex(
          (splitItem) => splitItem && project.includes(splitItem)
        ) > -1
    );

    const activeProjects = [];

    matchedProjects.forEach((matchedProject) => {
      projects.forEach((project) => {
        if (
          matchedProject === project ||
          (includeInPath &&
            (this.hasPath(matchedProject, project, []) ||
              this.hasPath(project, matchedProject, [])))
        ) {
          activeProjects.push(project);
        }
      });
    });

    this.select(...activeProjects);
  }

  focus(projectName: string) {
    const projects = this.query.getProjectNames();

    this.deselect(...projects);

    const activeProjects = [];

    projects.forEach((project) => {
      if (
        this.hasPath(projectName, project, []) ||
        this.hasPath(project, projectName, [])
      ) {
        activeProjects.push(project);
      }
    });

    this.select(...activeProjects);

    this.store.update({ focusedProject: projectName });
  }

  unfocus() {
    this.deselect(...this.query.getProjectNames());
    this.store.update({ focusedProject: null });
  }

  private hasPath(target, node, visited) {
    if (target === node) return true;

    const deps = this.query.getValue().dependencies[node];

    for (let d of (deps as any) || []) {
      if (d) {
        if (visited.indexOf(d.target) > -1) continue;
        visited.push(d.target);
        if (this.hasPath(target, d.target, visited)) return true;
      }
    }
    return false;
  }
}
