import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-dep-graph-projects-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
