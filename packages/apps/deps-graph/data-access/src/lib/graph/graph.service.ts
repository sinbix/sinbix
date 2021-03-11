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

    // console.log(this.query.getValue().dependencies);
  }

  toggleActive(projectName: string) {
    this.store.toggleActive(projectName);
  }

  // focusProject(id, doFilter = true) {
  //   this.graph.focusedProject = id;
  //   document.getElementById('focused-project').hidden = false;
  //   document.getElementById('focused-project-name').innerText = id;
  //   Array.from(
  //     document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
  //   ).forEach((checkbox) => {
  //     const showProject =
  //       this.hasPath(id, checkbox.value, []) ||
  //       this.hasPath(checkbox.value, id, []);
  //     checkbox.checked = showProject;
  //     checkbox.parentElement.hidden = !showProject;
  //   });
  //   if (doFilter) {
  //     this.filterProjects();
  //   }
  // }

  focus(projectName: string) {
    const projects = this.query.getAll().map((project) => project.name);

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

  select(...projectNames: string[]) {
    this.store.addActive(projectNames);
  }

  deselect(...projectNames: string[]) {
    this.store.removeActive(projectNames);
  }

  filterProjectsByText(searchFilter: ISearchFilterForm) {
    const { search, includeInPath } = searchFilter;

    const projects = this.query.getAll().map((project) => project.name);

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
