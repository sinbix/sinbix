import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'deps-graph-ui-project-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() active = false;

  @Input() focused = false;

  @Input() projectName: string;

  @Output() focusEvent: EventEmitter<string> = new EventEmitter();

  @Output() activeEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFocus() {
    this.focused = !this.focused;
    this.focusEvent.emit(this.projectName);
  }

  onActive() {
    this.active = !this.active;
    this.activeEvent.emit(this.projectName);
  }
}
