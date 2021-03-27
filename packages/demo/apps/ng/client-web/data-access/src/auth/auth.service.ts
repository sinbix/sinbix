import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAuthToken,
  ISigninArgs,
  ISignupArgs,
} from '@sinbix/demo/apps/shared/types';

import { AuthApiService } from './api';
import { AuthStorage } from './auth.storage';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenTimer: any;

  constructor(
    private apiAuthService: AuthApiService,
    private store: AuthStore,
    private storage: AuthStorage,
    private router: Router
  ) {
    this.autoAuthUser();
  }

  signin(args: ISigninArgs) {
    this.apiAuthService.signin(args).subscribe((res) => {
      this.authWithToken(res);
    });
  }

  signup(args: ISignupArgs) {
    this.apiAuthService.signup(args).subscribe((res) => {
      this.authWithToken(res);
    });
  }

  signout() {
    this.store.clear();
    clearTimeout(this.tokenTimer);
    this.storage.clearAuthData();
    this.redirect();
  }

  private authWithToken(token: IAuthToken) {
    this.setAuthTimer(token.expiresIn);
    const authState: AuthState = {
      userId: token.userId,
      token: token.accessToken,
      expiration: new Date(new Date().getTime() + token.expiresIn * 1000),
    };
    this.store.signin(authState);
    this.storage.saveAuthData(authState);
    this.redirect();
  }

  private redirect() {
    this.router.navigate(['/']);
  }

  private async autoAuthUser() {
    const authData = await this.storage.getAuthData();
    if (!authData) {
      return;
    }

    const expiresIn =
      new Date(authData?.expiration).getTime() - new Date().getTime();

    if (expiresIn) {
      this.store.signin(authData);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signout();
    }, duration * 1000);
  }
}
