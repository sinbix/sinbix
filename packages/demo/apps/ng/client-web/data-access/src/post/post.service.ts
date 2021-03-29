import { Injectable } from '@angular/core';
import { IPostCreateArgs } from '@sinbix/demo/apps/shared/types';
import { PostApiService } from './api';
import { PaginationState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private store: PostStore, private apiService: PostApiService) {}

  getPosts() {
    this.apiService.posts().subscribe((res) => {
      this.store.set(res);
    });
  }

  createPost(args: IPostCreateArgs): void {
    console.log(args);
    this.apiService.createPost(args).subscribe((res) => {
      this.store.add(res);
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
