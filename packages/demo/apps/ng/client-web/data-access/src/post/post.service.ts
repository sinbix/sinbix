import { Injectable } from '@angular/core';
import {
  IPostCreateArgs,
  IPostDeleteArgs,
} from '@sinbix/demo/apps/shared/types';
import { PostApiService } from './api';
import { PaginationState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private store: PostStore, private apiService: PostApiService) {}

  get() {
    this.apiService.posts().subscribe((res) => {
      this.store.set(res);
    });
  }

  create(args: IPostCreateArgs): void {
    this.apiService.createPost(args).subscribe((res) => {
      this.store.add(res);
    });
  }

  delete(args: IPostDeleteArgs) {
    this.apiService.deletePost(args).subscribe((res) => {
      this.store.remove(res.id);
    });
  }

  clearStore() {
    this.store.reset();
  }

  changePage(pagination: PaginationState) {
    this.store.update({
      pagination,
    });
  }
}
