import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IPost } from '@sinbix/demo/apps/shared/types';
import { PostDialogFormComponent } from '../dialog-form';

@Component({
  selector: 'ui-blog-post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @Input() posts: IPost[];

  @Input() userId: number;

  @Input() length: number;

  @Input() pageSize = 2;

  @Input() pageSizeOptions = [1, 2, 5, 10];

  @Input() pageIndex = 0;

  @Input() set dialogLoading(value: boolean) {
    this._dialogLoading = value;

    if (this.formRef) {
      if (!value) {
        this.formRef.close();
      }

      this.formRef.componentInstance.isLoading = value;
    }
  }
  get dialogLoading() {
    return this._dialogLoading;
  }
  private _dialogLoading: boolean;

  @Output() changePageEvent = new EventEmitter<PageEvent>();

  @Output() createEvent = new EventEmitter<Partial<IPost>>();

  @Output() deleteEvent = new EventEmitter<IPost>();

  @Output() editEvent = new EventEmitter<IPost>();

  formRef: MatDialogRef<PostDialogFormComponent>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEdit(post: IPost) {
    this.formRef = this.dialog.open(PostDialogFormComponent, {
      data: {
        titleForm: 'Update post',
        post,
      },
      autoFocus: false,
    });

    const instance = this.formRef.componentInstance;

    const sub = instance.saveEvent.subscribe((data) => {
      this.editEvent.emit({ ...post, ...data });
    });

    this.formRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  onCreate() {
    this.formRef = this.dialog.open(PostDialogFormComponent, {
      data: {
        titleForm: 'Create post',
      },
      autoFocus: false,
    });

    const instance = this.formRef.componentInstance;

    const sub = instance.saveEvent.subscribe((data) => {
      this.createEvent.emit(data);
    });

    this.formRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  onDelete(post: IPost) {
    this.deleteEvent.emit(post);
  }

  onChangePage(pageData: PageEvent) {
    this.pageIndex = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.changePageEvent.emit(pageData);
  }
}
