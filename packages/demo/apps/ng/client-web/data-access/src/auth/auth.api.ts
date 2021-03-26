import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { SIGNIN } from './auth.gql';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface Signin {
  signin: IAuthToken;
}

@Injectable({ providedIn: 'root' })
export class AuthApi implements ISigninGateway, ISignupGateway {
  constructor(private apollo: Apollo) {}

  signin(args: ISigninArgs): Observable<IAuthToken> {
    return this.apollo
      .mutate<Signin, ISigninArgs>({
        mutation: SIGNIN,
        variables: args,
      })
      .pipe(
        map((res) => {
          return res.data.signin;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }

  signup(args: ISignupArgs): Observable<IAuthToken> {
    throw new Error('Method not implemented.');
  }
}
