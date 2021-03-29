import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  PostQuery,
  PostService,
} from '@sinbix/demo/apps/ng/client-web/data-access';

@Component({
  selector: 'client-web-features-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit, OnDestroy {
  posts$ = this.postQuery.posts$;

  constructor(private postService: PostService, private postQuery: PostQuery) {}

  ngOnInit(): void {
    this.postService.getPosts();
  }

  ngOnDestroy(): void {
    this.postService.clearStore();
  }
}
