import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  IAuthResponse,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/shared/types/auth';
import { SIGNIN, SIGNUP } from './api.gql';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface Signin {
  signin: IAuthResponse;
}

interface Signup {
  signup: IAuthResponse;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService implements ISigninGateway, ISignupGateway {
  constructor(private apollo: Apollo) {}

  signin(args: ISigninArgs): Observable<IAuthResponse> {
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

  signup(args: ISignupArgs): Observable<IAuthResponse> {
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
