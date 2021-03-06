import { EventEmitter, ViewEncapsulation } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProjectGraphNode } from '@sinbix/core';

@Component({
  selector: 'ui-dep-graph-graph-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
  @Input() project: ProjectGraphNode;

  @Output() focusEvent: EventEmitter<string> = new EventEmitter();

  @Output() excludeEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFocus() {
    this.focusEvent.emit(this.project.name);
  }

  onExclude() {
    this.excludeEvent.emit(this.project.name);
  }
}
