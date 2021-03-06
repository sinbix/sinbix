import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Dictionary } from '@sinbix-common/utils';

@Component({
  selector: 'ui-dep-graph-projects-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @Input() projectGroups: Dictionary<string[]>;

  @Input() activeProjects: string[];

  @Input() focusedProject: string;

  @Output() focusEvent: EventEmitter<string> = new EventEmitter();

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

  isFocused(project) {
    return this.focusedProject === project;
  }

  onFocus(project: string) {
    this.focusEvent.emit(project);
  }

  onToggleActive(project: string) {
    this.toggleActiveEvent.emit(project);
  }
}
