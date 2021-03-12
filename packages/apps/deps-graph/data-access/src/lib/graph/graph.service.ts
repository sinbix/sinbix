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
      focused: focusedProject,
      active,
    });
    this.store.set(projects);
  }

  toggleActive(projectName: string) {
    this.store.toggleActive(projectName);
  }

  active(...projectNames: string[]) {
    this.store.addActive(projectNames);
  }

  deactive(...projectNames: string[]) {
    this.store.removeActive(projectNames);
  }

  activeAll() {
    this.active(...this.query.getProjectNames());
  }

  deactiveAll() {
    this.deactive(...this.query.getProjectNames());
  }

  filterProjectsByText(searchFilter: ISearchFilterForm) {
    this.deactiveAll();

    const { search, includeInPath } = searchFilter;

    const projects = this.query.getProjectNames();

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

    this.active(...activeProjects);
  }

  focus(projectName: string) {
    this.deactiveAll();

    const projects = this.query.getProjectNames();

    const activeProjects = [];

    projects.forEach((project) => {
      if (
        this.hasPath(projectName, project, []) ||
        this.hasPath(project, projectName, [])
      ) {
        activeProjects.push(project);
      }
    });

    this.active(...activeProjects);

    this.store.update({ focused: projectName });
  }

  unfocus() {
    this.deactiveAll();

    this.store.update({ focused: null });
  }

  activeAffected() {
    this.deactiveAll();
    this.active(...this.query.getValue().affected);
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
