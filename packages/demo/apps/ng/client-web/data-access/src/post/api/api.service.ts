import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ICreatePostGateway,
  IPost,
  IPostCreateArgs,
  IPostsGateway,
} from '@sinbix/demo/apps/shared/types';
import { Observable, throwError } from 'rxjs';
import { CREATE_POST, POSTS } from './api.gql';
import { catchError, map } from 'rxjs/operators';

interface Posts {
  posts: IPost[];
}

interface CreatePost {
  createPost: IPost;
}

@Injectable({ providedIn: 'root' })
export class PostApiService implements IPostsGateway, ICreatePostGateway {
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
}
