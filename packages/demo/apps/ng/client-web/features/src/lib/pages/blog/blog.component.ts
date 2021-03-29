import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import {
  AuthQuery,
  PostQuery,
  PostService,
} from '@sinbix/demo/apps/ng/client-web/data-access';
import { PostDialogFormComponent } from '@sinbix/demo/apps/ng/client-web/ui';

@Component({
  selector: 'client-web-features-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit, OnDestroy {
  isAuth$ = this.authQuery.isAuth$;

  posts$ = this.postQuery.paginatedPosts$;

  pageSize$ = this.postQuery.pageSize$;

  pageIndex$ = this.postQuery.pageIndex$;

  length$ = this.postQuery.length$;

  constructor(
    private postService: PostService,
    private postQuery: PostQuery,
    private authQuery: AuthQuery,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postService.getPosts();
  }

  ngOnDestroy(): void {
    this.postService.clearStore();
  }

  onPagination(pageData: PageEvent) {
    this.postService.changePage({
      pageIndex: pageData.pageIndex,
      pageSize: pageData.pageSize,
    });
  }

  onCreate() {
    const ref = this.dialog.open(PostDialogFormComponent, {
      data: {
        titleForm: 'Create post',
      },
      autoFocus: false,
    });

    const instance = ref.componentInstance;

    const sub = instance.saveEvent.subscribe((data) => {
      console.log(data);
      instance.isLoading = true;
      this.postService.createPost({
        data: {
          authorId: this.authQuery.getUser().id,
          title: data.title,
          content: data.content,
        },
      });
      ref.close();
    });
  }
}
