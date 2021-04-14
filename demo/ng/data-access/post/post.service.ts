import { Injectable } from '@angular/core';
import {
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostUpdateArgs,
} from '@sinbix/demo/shared/utils/post';
import { ErrorService } from '@sinbix/demo/ng/utils/error';
import { PostApiService } from './api';
import { PostQuery } from './post.query';
import { PaginationState, PostStore } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(
    private store: PostStore,
    private query: PostQuery,
    private apiService: PostApiService,
    private errorService: ErrorService
  ) {}

  get() {
    this.apiService.posts().subscribe(
      (res) => {
        this.store.set(res);
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
  }

  create(args: IPostCreateArgs): void {
    this.store.setLoading(true);
    this.apiService.createPost(args).subscribe(
      (res) => {
        this.store.add(res, { loading: false });
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
  }

  update(args: IPostUpdateArgs): void {
    this.store.setLoading(true);
    this.apiService.updatePost(args).subscribe(
      (res) => {
        this.store.update(res.id, res);
        this.store.setLoading(false);
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
  }

  delete(args: IPostDeleteArgs) {
    this.store.setLoading(true);
    this.apiService.deletePost(args).subscribe(
      (res) => {
        this.store.remove(res.id);
        if (this.query.getCount())
          this.store.update({
            pagination: {
              ...this.query.getValue()?.pagination,
              pageIndex: 0,
            },
          });
        this.store.setLoading(false);
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
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
