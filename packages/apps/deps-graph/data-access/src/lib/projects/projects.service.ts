import { Injectable } from '@angular/core';
import { ProjectGraphNode } from '@sinbix/core';
import { ProjectsQuery } from './projects.query';
import { ProjectsStore } from './projects.store';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private store: ProjectsStore, private query: ProjectsQuery) {}

  initData() {

  }

  setProjects(projects: ProjectGraphNode[]) {
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
}
