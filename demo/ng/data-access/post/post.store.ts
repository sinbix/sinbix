import { Injectable } from '@angular/core';
import { EntityState } from '@datorama/akita';
import { StoreConfig, EntityStore } from '@datorama/akita';
import type { IPost } from '@sinbix/demo/shared/utils/post';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PostState extends EntityState<IPost> {
  pagination: PaginationState;
}

function createInitialState(): Partial<PostState> {
  return {
    pagination: {
      pageSize: 2,
      pageIndex: 0,
    },
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'post', resettable: true })
export class PostStore extends EntityStore<PostState, IPost> {
  constructor() {
    super(createInitialState());
  }
}
