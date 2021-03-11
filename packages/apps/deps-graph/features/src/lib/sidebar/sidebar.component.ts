import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISearchFilterForm } from '../utils';
import { GraphQuery, GraphService } from '@sinbix/apps/deps-graph/data-access';
import * as _ from 'lodash';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'deps-graph-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  activedProjects$ = this.graphQuery.selectActiveId();

  projectGroups$ = this.graphQuery.projectGroups$;

  focusedProject$ = this.graphQuery.focusedProject$;

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

    // if (this.graph.focusedProject !== null) {
    //   this.focusProject(this.graph.focusedProject, false);
    // }

    // if (this.graph.exclude.length > 0) {
    //     this.graph.exclude.forEach((project) =>
    //     this.excludeProject(project, false)
    //   );
    // }
  }

  unfocusProject() {
    this.graphService.unfocus();
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

  onFocus(project) {
    this.graphService.focus(project);
  }

  @Debounce(500)
  private filterProjectsByText(searchFilter: ISearchFilterForm) {
    this.graphService.filterProjectsByText(searchFilter);
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

  // excludeProject(id, doFilter = true) {
  //   document.querySelector<HTMLInputElement>(
  //     `input[name=projectName][value=${id}]`
  //   ).checked = false;
  //   if (doFilter) {
  //     this.filterProjects();
  //   }
  // }

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
}
