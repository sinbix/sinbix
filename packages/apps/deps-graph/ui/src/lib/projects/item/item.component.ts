import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'deps-graph-ui-project-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() active = false;

  @Input() focused = false;

  @Input() project: string;

  @Output() toggleFocusEvent: EventEmitter<string> = new EventEmitter();

  @Output() toggleActiveEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggleFocus() {
    this.focused = !this.focused;
    this.toggleFocusEvent.emit(this.project);
  }

  onToggleActive() {
    this.toggleActiveEvent.emit(this.project);
  }
}
