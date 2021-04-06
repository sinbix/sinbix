import { Injectable } from '@angular/core';
import {
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostUpdateArgs,
} from '@sinbix/demo/shared/types';
import { PostApiService } from './api';
import { PostQuery } from './post.query';
import { PaginationState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(
    private store: PostStore,
    private query: PostQuery,
    private apiService: PostApiService
  ) {}

  get() {
    this.apiService.posts().subscribe((res) => {
      this.store.set(res);
    });
  }

  create(args: IPostCreateArgs): void {
    this.store.setLoading(true);
    this.apiService.createPost(args).subscribe((res) => {
      this.store.add(res, { loading: false });
    });
  }

  update(args: IPostUpdateArgs): void {
    this.store.setLoading(true);
    this.apiService.updatePost(args).subscribe((res) => {
      this.store.update(res.id, res);
      this.store.setLoading(false);
    });
  }

  delete(args: IPostDeleteArgs) {
    this.store.setLoading(true);
    this.apiService.deletePost(args).subscribe((res) => {
      this.store.remove(res.id);
      if (this.query.getCount())
        this.store.update({
          pagination: {
            ...this.query.getValue()?.pagination,
            pageIndex: 0,
          },
        });
      this.store.setLoading(false);
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