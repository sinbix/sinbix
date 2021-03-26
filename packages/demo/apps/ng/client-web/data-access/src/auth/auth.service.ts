import { Injectable } from '@angular/core';
import { ISigninArgs } from '@sinbix/demo/apps/shared/utils';
import { AuthApi } from './auth.api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApi) {}

  signin(args: ISigninArgs) {
    this.authApi.signin(args).subscribe((res) => {
      console.log(res);
    });
  }
}
