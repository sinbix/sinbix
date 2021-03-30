import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'ui-games-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesSortingComponent implements OnInit {
  @Input() sort: Sort;
  @Input() sortFavorite: boolean;

  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();

  @Output() sortFavoriteEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  @Debounce(1000)
  onSort(sort: Sort) {
    this.sortEvent.emit(sort);
  }

  @Debounce(1000)
  onFavoriteToggle(sort: boolean) {
    this.sortFavoriteEvent.emit(sort);
  }
}
