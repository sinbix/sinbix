import { Injectable } from '@angular/core';
import { PostApiService } from './api';
import { PostStore } from './post.store';

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
}
