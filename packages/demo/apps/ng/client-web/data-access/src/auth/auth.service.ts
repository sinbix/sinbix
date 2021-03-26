import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISigninArgs } from '@sinbix/demo/apps/shared/utils';

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
    this.apiAuthService.signin(args).subscribe((authToken) => {
      this.setAuthTimer(authToken.expiresIn);
      const authState: AuthState = {
        userId: authToken.userId,
        token: authToken.accessToken,
        expiration: new Date(new Date().getTime() + authToken.expiresIn * 1000),
      };
      this.store.signin(authState);
      this.storage.saveAuthData(authState);
      this.redirect();
    });
  }

  signout() {
    this.store.clear();
    clearTimeout(this.tokenTimer);
    this.storage.clearAuthData();
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
