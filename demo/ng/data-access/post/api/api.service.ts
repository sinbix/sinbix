import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
} from '@sinbix/demo/shared/types/post';
import { Observable, throwError } from 'rxjs';
import { CREATE_POST, DELETE_POST, POSTS, UPDATE_POST } from './api.gql';
import { catchError, map } from 'rxjs/operators';

interface Posts {
  posts: IPost[];
}

interface CreatePost {
  createPost: IPost;
}

interface UpdatePost {
  updatePost: IPost;
}

interface DeletePost {
  deletePost: IPost;
}

@Injectable({ providedIn: 'root' })
export class PostApiService
  implements IPostsGateway, ICreatePostGateway, IDeletePostGateway {
  constructor(private apollo: Apollo) {}

  posts(): Observable<IPost[]> {
    return this.apollo
      .query<Posts>({
        query: POSTS,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(({ data }) => {
          return data.posts;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  createPost(args: IPostCreateArgs): Observable<IPost> {
    return this.apollo
      .mutate<CreatePost, IPostCreateArgs>({
        mutation: CREATE_POST,
        variables: args,
      })
      .pipe(
        map((res) => {
          return res.data.createPost;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  updatePost(args: IPostUpdateArgs): Observable<IPost> {
    return this.apollo
      .mutate<UpdatePost, IPostUpdateArgs>({
        mutation: UPDATE_POST,
        variables: args,
      })
      .pipe(
        map((res) => {
          return res.data.updatePost;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  deletePost(args: IPostDeleteArgs): Observable<IPost> {
    return this.apollo
      .mutate<DeletePost, IPostDeleteArgs>({
        mutation: DELETE_POST,
        variables: args,
      })
      .pipe(
        map((res) => {
          return res.data.deletePost;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
