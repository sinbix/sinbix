import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAuthResponse,
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
      this.authWithResponose(res);
    });
  }

  signup(args: ISignupArgs) {
    this.apiAuthService.signup(args).subscribe((res) => {
      this.authWithResponose(res);
    });
  }

  signout() {
    this.store.reset();
    clearTimeout(this.tokenTimer);
    this.storage.clearAuthData();
    this.redirect();
  }

  private authWithResponose(res: IAuthResponse) {
    this.setAuthTimer(res.expiresIn);
    const authState: AuthState = {
      user: res.user,
      token: res.accessToken,
      expiration: new Date(new Date().getTime() + res.expiresIn * 1000),
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
