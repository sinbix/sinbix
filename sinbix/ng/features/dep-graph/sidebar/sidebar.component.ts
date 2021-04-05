import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepGraphQuery, DepGraphService } from '@sinbix/sinbix/ng/data-access';
import * as _ from 'lodash';
import { Debounce } from '@sinbix-common/utils';
import { ISearchFilterForm } from '@sinbix/sinbix/ng/utils/interfaces';

@Component({
  selector: 'feat-dep-graph-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  activedProjects$ = this.graphQuery.selectActiveId();

  projectGroups$ = this.graphQuery.projectGroups$;

  focusedProject$ = this.graphQuery.focused$;

  affectedProjects$ = this.graphQuery.affected$;

  searchFilterForm: FormGroup;

  private formBuilder: FormBuilder = new FormBuilder();

  constructor(
    private graphService: DepGraphService,
    private graphQuery: DepGraphQuery
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
