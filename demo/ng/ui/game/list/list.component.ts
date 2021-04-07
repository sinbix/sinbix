import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ID } from '@datorama/akita';
import { IGame } from '@sinbix/demo/shared/utils/game';
import { StepEvent } from './utils';

@Component({
  selector: 'ui-games-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesListComponent implements OnInit {
  @Input() games: IGame[] = [];

  @Input() favorites: ID[] = [];

  @Output() favoriteEvent: EventEmitter<ID> = new EventEmitter();

  @Output() stepEvent: EventEmitter<StepEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFavorite(id: ID) {
    this.favoriteEvent.emit(id);
  }

  onStep(stepEvent: StepEvent) {
    this.stepEvent.emit(stepEvent);
  }

  isFavorite(gameId: ID) {
    return this.favorites?.length
      ? this.favorites.indexOf(gameId) != -1
      : false;
  }

  trackByFn(index, item) {
    return item.id;
  }
}
