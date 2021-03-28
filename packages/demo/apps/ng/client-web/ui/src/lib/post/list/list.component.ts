import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IPost } from '@sinbix/demo/apps/shared/types';

@Component({
  selector: 'ui-blog-post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @Input() posts: IPost[];

  @Input() userId: number;

  @Input() totalPosts: number;

  @Input() pageSize = 2;

  @Input() pageSizeOptions = [1, 2, 5, 10];

  @Input() pageIndex = 0;

  @Output() changePageEvent = new EventEmitter<PageEvent>();

  @Output() deleteEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(postId: string) {
    this.deleteEvent.emit(postId);
  }

  onChangePage(pageData: PageEvent) {
    this.pageIndex = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.changePageEvent.emit(pageData);
  }
}
