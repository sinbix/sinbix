import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFilterForm } from '../utils';
import {
  GraphQuery,
  GraphService,
} from '@sinbix/apps/deps-graph/data-access';
import * as _ from 'lodash';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'deps-graph-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  projectGroups$ = this.graphQuery.projectGroups$;

  activedProjects$ = this.graphQuery.selectActiveId();

  searchFilterForm: FormGroup;

  private formBuilder: FormBuilder = new FormBuilder();

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery
  ) {}

  ngOnInit(): void {
    this.checkForAffected();

    this.searchFilterForm = this.formBuilder.group({
      search: [''],
      includeInPath: [false],
    });

    this.searchFilterForm.valueChanges.subscribe((values) => {
      this.filterProjectsByText(values);
    });
  }

  unfocusProject() {
    // this.graph.focusedProject = null;
    // document.getElementById('focused-project').hidden = true;
    // document.getElementById('focused-project-name').innerText = '';
    // Array.from(
    //   document.querySelectorAll<HTMLInputElement>('input[name=projectName]')
    // ).forEach((checkbox) => {
    //   checkbox.checked = false;
    //   checkbox.parentElement.hidden = false;
    // });
    // this.filterProjects();
  }

  selectAffectedProjects() {
    // this.graph.focusedProject = null;
    // document.getElementById('focused-project').hidden = true;
    // document.getElementById('focused-project-name').innerText = '';
    // this.getProjectCheckboxes().forEach((checkbox) => {
    //   checkbox.checked = this.graph.affected.includes(checkbox.value);
    // });
    // this.filterProjects();
  }

  selectAllProjects() {
    this.graphService.select(
      ...this.graphQuery.getAll().map((project) => project.name)
    );
    // this.graph.focusedProject = null;
    // document.getElementById('focused-project').hidden = true;
    // document.getElementById('focused-project-name').innerText = '';

    // this.getProjectCheckboxes().forEach((checkbox) => {
    //   checkbox.checked = true;
    // });

    // this.filterProjects();
  }

  deselectAllProjects(clearSearchInput = true) {
    this.graphService.deselect(
      ...this.graphQuery.getAll().map((project) => project.name)
    );

    // this.graph.focusedProject = null;
    // document.getElementById('focused-project').hidden = true;
    // document.getElementById('focused-project-name').innerText = '';

    // this.getProjectCheckboxes().forEach((checkbox) => {
    //   checkbox.checked = false;
    // });

    // this.filterProjects();
  }

  onToggleActive(project) {
    this.graphService.toggleActive(project);
  }

  @Debounce(500)
  private filterProjectsByText(searchFilter: SearchFilterForm) {
    const { search, includeInPath } = searchFilter;

      const projects = this.graphQuery.getAll().map((project) => project.name);

      this.graphService.deselect(...projects);

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

      this.graphService.select(...activeProjects);

  }

  private checkForAffected() {
    // const isAffected = this.graph.affected.length > 0;
    // if (isAffected) {
    //   const selectedAffectedButton = document.getElementById(
    //     'select-affected-button'
    //   );
    //   selectedAffectedButton.classList.remove('hide');
    //   this.selectAffectedProjects();
  }

  private hasPath(target, node, visited) {
    if (target === node) return true;

    const deps = this.graphQuery.getValue().dependencies[node];

    // console.log(this.graphQuery.getValue().dependencies[node]);

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
