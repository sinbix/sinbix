import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import type { IPost } from '@sinbix/demo/shared/utils/post';
import { map, mergeMap } from 'rxjs/operators';
import { PostState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostQuery extends QueryEntity<PostState, IPost> {
  posts$ = this.selectAll();

  length$ = this.selectCount();

  paginatedPosts$ = this.select((state) => state.pagination).pipe(
    mergeMap((pagination) => {
      const { pageIndex, pageSize } = pagination;
      const start = pageIndex * pageSize;
      return this.posts$.pipe(
        map((posts) => posts.slice(start, start + pageSize))
      );
    })
  );

  pageSize$ = this.select((state) => state.pagination?.pageSize);

  pageIndex$ = this.select((state) => state.pagination?.pageIndex);

  isLoading$ = this.select((state) => state.loading);

  constructor(protected store: PostStore) {
    super(store);
  }
}
