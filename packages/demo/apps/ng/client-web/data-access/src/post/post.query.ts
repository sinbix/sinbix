import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import type { IPost } from '@sinbix/demo/apps/shared/types';
import { PostState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostQuery extends QueryEntity<PostState, IPost> {
  posts$ = this.selectAll();

  constructor(protected store: PostStore) {
    super(store);
  }
}
