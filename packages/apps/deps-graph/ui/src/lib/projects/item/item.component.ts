import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'deps-graph-ui-project-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() active: boolean;

  @Input() focused: boolean;

  @Input() project: string;

  @Output() focusEvent: EventEmitter<string> = new EventEmitter();

  @Output() toggleActiveEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFocus() {
    this.focused = true;
    this.focusEvent.emit(this.project);
  }

  onToggleActive() {
    this.toggleActiveEvent.emit(this.project);
  }
}
