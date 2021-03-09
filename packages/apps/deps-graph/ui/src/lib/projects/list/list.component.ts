import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dictionary } from '@sinbix-common/utils';

@Component({
  selector: 'deps-graph-ui-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() projectGroups: Dictionary<string[]>;

  @Input() activeProjects: string[];

  @Output() toggleFocusEvent: EventEmitter<string> = new EventEmitter();

  @Output() toggleActiveEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  trackByGroupFn(index, group) {
    return group;
  }

  trackByProjectFn(index, project: string) {
    return project;
  }

  isActive(project) {
    return this.activeProjects?.includes(project);
  }

  onToggleFocus(project: string) {
    this.toggleFocusEvent.emit(project);
  }

  onToggleActive(project: string) {
    this.toggleActiveEvent.emit(project);
  }
}
