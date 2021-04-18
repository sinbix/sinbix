import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAuthResponse,
  ISigninArgs,
  ISignupArgs,
} from '@sinbix/demo/shared/utils/auth';
import { ErrorService } from '@sinbix/demo/ng/utils/error';

import { AuthApiService } from './api';
import { AuthStorage } from './auth.storage';
import { AuthState, AuthStore } from './auth.store';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  private tokenTimer: any;

  constructor(
    private apiAuthService: AuthApiService,
    private store: AuthStore,
    private storage: AuthStorage,
    private router: Router,
    private errorService: ErrorService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  signin(args: ISigninArgs) {
    this.apiAuthService.signin(args).subscribe(
      (res) => {
        this.authWithResponose(res);
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
  }

  signup(args: ISignupArgs) {
    this.apiAuthService.signup(args).subscribe(
      (res) => {
        this.authWithResponose(res);
      },
      (err) => {
        this.errorService.throwError(err);
      }
    );
  }

  signout() {
    this.store.reset();
    clearTimeout(this.tokenTimer);
    this.storage.clearAuthData();
    this.redirect();
  }

  autoAuthUser() {
    return this.storage.getAuthData().then((authData) => {
      if (!authData) {
        return;
      }

      const expiresIn =
        new Date(authData?.expiration).getTime() - new Date().getTime();

      if (expiresIn) {
        this.store.signin(authData);
        this.setAuthTimer(expiresIn / 1000);
      }
    });
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

  private setAuthTimer(duration: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenTimer = setTimeout(() => {
        this.signout();
      }, duration * 1000);
    }
  }
}
