import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'ui-games-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesPaginatorComponent implements OnInit {
  @Input() length: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];

  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();

  ngOnInit(): void {}

  @Debounce(500)
  onPage(event: PageEvent) {
    this.pageEvent.emit(event);
  }
}
