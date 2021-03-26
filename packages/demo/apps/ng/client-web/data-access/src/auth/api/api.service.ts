import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { SIGNIN, SIGNUP } from './api.gql';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface Signin {
  signin: IAuthToken;
}

interface Signup {
  signup: IAuthToken;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService implements ISigninGateway, ISignupGateway {
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
    return this.apollo
      .mutate<Signup, ISigninArgs>({
        mutation: SIGNUP,
        variables: args,
      })
      .pipe(
        map((res) => {
          return res.data.signup;
        }),
        catchError((err) => {
          return throwError(err.message);
        })
      );
  }
}
