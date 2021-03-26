import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IPost, IPostsGateway } from '@sinbix/demo/apps/shared/utils';
import { Observable, throwError } from 'rxjs';
import { POSTS } from './post.gql';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService implements IPostsGateway {
  constructor(private apollo: Apollo) {}
  posts(): Observable<IPost[]> {
    return this.apollo
      .query({
        query: POSTS,
      })
      .pipe(
        map(({ data }: any) => {
          return data.posts;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
