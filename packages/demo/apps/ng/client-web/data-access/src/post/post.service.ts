import { Injectable } from '@angular/core';
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

  clearStore() {
    this.store.reset();
  }

  changePage(pagination: PaginationState) {
    this.store.update({
      pagination,
    });
  }
}
