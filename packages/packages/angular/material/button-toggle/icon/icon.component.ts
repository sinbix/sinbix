import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'smat-toggle-button-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToggleButtonIconComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();

  @Input() checked: boolean;

  @Input() icons: [string, string];

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.checked = !this.checked;
    this.toggleEvent.emit(this.checked);
  }
}
