import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { POSTS, SIGNIN } from './auth.gql';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { ApolloError } from 'apollo-client';

@Injectable({ providedIn: 'root' })
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(private apollo: Apollo) {}

  signup(args: ISignupArgs): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
  async signin(args: ISigninArgs): Promise<IAuthToken> {
    // console.log(args, 'signin');

    // this.apollo
    //   .query({
    //     query: POSTS,
    //   })
    //   .subscribe((posts) => {
    //     console.log(posts);
    //   });

    // this.apollo
    //   .watchQuery({
    //     query: POSTS,
    //   })
    //   .valueChanges.subscribe((posts) => {
    //     console.log(posts);
    //   });

    // this.apollo
    //   .mutate<IAuthToken, ISigninArgs>({
    //     mutation: SIGNIN,
    //     variables: args,
    //   })
    //   .subscribe(
    //     (next) => {
    //       console.log(next, 'next');
    //     },
    //     (error) => {
    //       console.log(error, 'error');

    //       console.log(error.message, 'message');
    //     }
    //   );

    // await this.apollo
    //   .mutate({
    //     mutation: SIGNIN,
    //     variables: args,
    //   })
    //   .pipe(
    //     map(({ data }: any) => {
    //       return data.signin;
    //     }),
    //     catchError((err) => {
    //       return throwError(err.message);
    //     })
    //   )
    //   .toPromise()
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return this.apollo
      .mutate<IAuthToken, ISigninArgs>({
        mutation: SIGNIN,
        variables: args,
      })
      .pipe(
        map(({ data }: any) => {
          return data.signin;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      )
      .toPromise();

    return null;
  }
}
