import { Injectable } from '@angular/core';
import { EntityState } from '@datorama/akita';
import { StoreConfig, EntityStore } from '@datorama/akita';
import type { IPost } from '@sinbix/demo/apps/shared/types';

export interface PostState extends EntityState<IPost> {
  pagination: 
}

function createInitialState(): Partial<PostState> {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'post', resettable: true })
export class PostStore extends EntityStore<PostState, IPost> {
  constructor() {
    super(createInitialState());
  }
}
