import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

import { AuthQuery } from '@sinbix/demo/ng/data-access/auth';
import { PostQuery, PostService } from '@sinbix/demo/ng/data-access/post';
import { IPost } from '@sinbix/demo/shared/types/post';

@Component({
  selector: 'client-web-features-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit, OnDestroy {
  isAuth$ = this.authQuery.isAuth$;

  userId$ = this.authQuery.userId$;

  posts$ = this.postQuery.paginatedPosts$;

  pageSize$ = this.postQuery.pageSize$;

  pageIndex$ = this.postQuery.pageIndex$;

  length$ = this.postQuery.length$;

  isLoading$ = this.postQuery.isLoading$;

  constructor(
    private titleService: Title,
    private postService: PostService,
    private postQuery: PostQuery,
    private authQuery: AuthQuery
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Demo | Blog');
    this.postService.get();
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

  onCreate(data: Partial<IPost>) {
    this.postService.create({
      data: {
        authorId: this.authQuery.getUser().id,
        title: data.title,
        content: data.content,
      },
    });
  }

  onDelete(post: IPost) {
    this.postService.delete({
      where: {
        id: post.id,
      },
    });
  }

  onEdit(post: IPost) {
    const { title, content, id } = post;
    this.postService.update({
      data: { title, content },
      where: {
        id,
      },
    });
  }
}
