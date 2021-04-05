import { Injectable } from '@angular/core';
import { GraphQuery } from './graph.query';
import { GraphStore } from './graph.store';
import { IGraphModel, ISearchFilterForm } from '@sinbix/sinbix/ng/utils';

@Injectable({ providedIn: 'root' })
export class GraphService {
  constructor(private store: GraphStore, private query: GraphQuery) {}

  setGraph(graph: IGraphModel) {
    this.store.set(graph.projects);

    this.store.update({
      dependencies: graph.dependencies,
      affected: graph.affected,
    });

    this.focus(graph.focused);

    this.activeAffected();

    this.active(...graph.active);

    this.deactive(...graph.exclude);
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
    this.active(...this.query.getValue().affected);
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
