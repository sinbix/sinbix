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
import {
  PostDialogsFormComponent,
  PostDialogsDeleteComponent,
} from '../dialogs';

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

    if (this.dialogRef) {
      if (!value) {
        this.dialogRef.close();
      }

      this.dialogRef.componentInstance.isLoading = value;
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

  dialogRef: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEdit(post: IPost) {
    this.dialogHandle(
      PostDialogsFormComponent,
      {
        titleForm: 'Update post',
        post,
      },
      (data) => {
        this.editEvent.emit({ ...post, ...data });
      }
    );
  }

  onCreate() {
    this.dialogHandle(
      PostDialogsFormComponent,
      {
        titleForm: 'Create post',
      },
      (data) => {
        this.createEvent.emit(data);
      }
    );
  }

  onDelete(post: IPost) {
    this.dialogHandle(PostDialogsDeleteComponent, null, () => {
      this.deleteEvent.emit(post);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.pageIndex = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.changePageEvent.emit(pageData);
  }

  private dialogHandle(
    component: any,
    dialogData: any,
    saveEvent: { (data: any): void }
  ) {
    this.dialogRef = this.dialog.open(component, {
      data: dialogData,
      autoFocus: false,
    });

    const instance = this.dialogRef.componentInstance;

    const sub = instance.saveEvent.subscribe((data) => {
      saveEvent(data);
    });

    this.dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
