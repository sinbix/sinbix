import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'ui-games-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesCardComponent implements OnInit {
  @Input() id: number;

  @Input() mechant: string;

  @Input() name: string;

  @Input() image: string;

  @Input() favorite: boolean;

  @Input() step: number;

  @Output() favoriteToggleEvent: EventEmitter<number> = new EventEmitter();

  @Output() stepChangeEvent: EventEmitter<number> = new EventEmitter();

  playHover: boolean;

  constructor() {}

  ngOnInit(): void {}

  playMouseenter() {
    this.playHover = true;
  }

  playMouseleave() {
    this.playHover = false;
  }

  onFavoriteToggle() {
    this.favoriteToggleEvent.emit(this.id);
  }

  @Debounce(1000)
  onStepChange(step: number) {
    this.stepChangeEvent.emit(step);
  }
}
