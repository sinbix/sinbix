import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GraphQuery, GraphService } from '@sinbix/sinbix/ng/data-access';
import * as _ from 'lodash';
import { Debounce } from '@sinbix-common/utils';
import { ISearchFilterForm } from '@sinbix/sinbix/ng/utils';

@Component({
  selector: 'deps-graph-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  activedProjects$ = this.graphQuery.selectActiveId();

  projectGroups$ = this.graphQuery.projectGroups$;

  focusedProject$ = this.graphQuery.focused$;

  affectedProjects$ = this.graphQuery.affected$;

  searchFilterForm: FormGroup;

  private formBuilder: FormBuilder = new FormBuilder();

  constructor(
    private graphService: GraphService,
    private graphQuery: GraphQuery
  ) {}

  ngOnInit(): void {
    this.searchFilterForm = this.formBuilder.group({
      search: [''],
      includeInPath: [false],
    });

    this.searchFilterForm.valueChanges.subscribe((values) => {
      this.filterProjectsByText(values);
    });
  }

  unfocusProject() {
    this.graphService.unfocus();
  }

  selectAffectedProjects() {
    this.unfocusProject();
    this.graphService.activeAffected();
  }

  selectAllProjects() {
    this.unfocusProject();
    this.graphService.activeAll();
  }

  deselectAllProjects(clearSearchInput = true) {
    this.unfocusProject();
    this.graphService.deactiveAll();
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
}
