import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProjectGraphNode } from '@sinbix/core';

@Component({
  selector: 'deps-graph-ui-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
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
