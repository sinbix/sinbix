import { default as tippy, hideAll } from 'tippy.js';
import { select, curveBasis, zoom, zoomIdentity } from 'd3';
import * as dagreD3 from 'dagre-d3';
import { Component, ElementRef, OnInit } from '@angular/core';
import { mediumGraph, environment } from '@sinbix/apps/deps-graph/utils';
import { IGraphModel } from '@sinbix/apps/deps-graph/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchFilterForm } from './utils';
import { GraphQuery, GraphService } from '@sinbix/apps/deps-graph/data-access';
import * as _ from 'lodash';
import { ScreenQuery } from '@sinbix-angular/utils';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'deps-graph-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  projects$ = this.graphQuery.selectAll();

  activedProjects$ = this.graphQuery.selectActive();

  dependencies$ = this.graphQuery.dependencies$;

  affected$ = this.graphQuery.affected$;

  focusedProject$ = this.graphQuery.focusedProject$;

  graph: IGraphModel = {
    projects: null,
    dependencies: null,
    affected: null,
    focusedProject: null,
    active: [],
    exclude: null,
  };

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery,
    private screenQuery: ScreenQuery,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    if (!environment.production) {
      this.demo();
    }

    if (this.graph.focusedProject !== null) {
      this.focusProject(this.graph.focusedProject, false);
    }

    if (this.graph.exclude.length > 0) {
      this.graph.exclude.forEach((project) =>
        this.excludeProject(project, false)
      );
    }

    // this.dependencies$.subscribe((deps) => {
    //   console.log(deps);
    // });

    // this.projectsQuery.selectActiveId().subscribe((activeProjects) => {
    //   const projects = this.projectsQuery
    //     .getAll()
    //     .map((project) => project.name);

    //   const selectedProjects = projects.filter((project) =>
    //     activeProjects.includes(project)
    //   );

    //   const unselectedProjects = projects.filter(
    //     (project) => !activeProjects.includes(project)
    //   );

    //   if (selectedProjects.length === this.graph.projects.length) {
    //     this.graph.active = this.graph.projects.map((proj) => proj.name);
    //   } else {
    //     this.graph.active = this.graph.projects
    //       .filter((p) => {
    //         const filtered = selectedProjects.find(
    //           (f) => this.hasPath(f, p.name, []) || this.hasPath(p.name, f, [])
    //         );

    //         return unselectedProjects.indexOf(p.name) === -1 && filtered;
    //       })
    //       .map((proj) => proj.name);
    //   }

    //   if (this.graph.active.length === 0) {
    //     document.getElementById('no-projects-chosen').style.display = 'flex';
    //   } else {
    //     document.getElementById('no-projects-chosen').style.display = 'none';
    //   }
    // });

    // this.projectsService.toggleActive('apps-nest-ms-redis');
  }

  // private hasPath(target, node, visited) {
  //   if (target === node) return true;

  //   for (let d of this.graph.dependencies || []) {
  //     if (d) {
  //       if (visited.indexOf(d.target) > -1) continue;
  //       visited.push(d.target);
  //       if (this.hasPath(target, d.target, visited)) return true;
  //     }
  //   }
  //   return false;
  // }

  private demo() {
    const currentGraph = mediumGraph;
    const nodes = Object.values(currentGraph.nodes).filter(
      (node) => node.type !== 'npm'
    );

    this.graph.projects = nodes as any;
    this.graph.dependencies = currentGraph.dependencies as any;
    this.graph.affected = [];
    this.graph.exclude = [];
    this.graphService.setGraph(this.graph);
    // const currentGraph = mediumGraph;

    // const nodes = Object.values(currentGraph.nodes).filter(
    //   (node) => node.type !== 'npm'
    // );

    // this.projectsService.setProjects(nodes as any);

    // this.graph.projects = nodes as any;
    // this.graph.dependencies = currentGraph.dependencies as any;
    // this.graph.affected = [];
    // this.graph.exclude = [];
  }

  // getProjectsByType(type) {
  //   return this.graph.projects.filter((project) => project.type === type);
  // }

  groupProjectsByDirectory(projects) {
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

  excludeProject(id, doFilter = true) {
    // document.querySelector<HTMLInputElement>(
    //   `input[name=projectName][value=${id}]`
    // ).checked = false;
    // if (doFilter) {
    //   this.filterProjects();
    // }
  }

  focusProject(id, doFilter = true) {
    // this.graph.focusedProject = id;
    // document.getElementById('focused-project').hidden = false;
    // document.getElementById('focused-project-name').innerText = id;
    // Array.from(
    //   document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    // ).forEach((checkbox) => {
    //   const showProject =
    //     this.hasPath(id, checkbox.value, []) ||
    //     this.hasPath(checkbox.value, id, []);
    //   checkbox.checked = showProject;
    //   checkbox.parentElement.hidden = !showProject;
    // });
    // if (doFilter) {
    //   this.filterProjects();
    // }
  }
}
