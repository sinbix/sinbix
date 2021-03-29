import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IPost, IPostsGateway } from '@sinbix/demo/apps/shared/types';
import { Observable, throwError } from 'rxjs';
import { POSTS } from './api.gql';
import { catchError, map } from 'rxjs/operators';

interface Posts {
  posts: IPost[];
}

@Injectable({ providedIn: 'root' })
export class PostApiService implements IPostsGateway {
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
}
