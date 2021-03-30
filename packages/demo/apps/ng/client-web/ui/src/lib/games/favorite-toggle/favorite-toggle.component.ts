import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-games-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesFavoriteToggleComponent implements OnInit {
  @Input() active: boolean;

  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  onToggle() {
    this.active = !this.active;
    this.toggleEvent.emit(this.active);
  }
}
