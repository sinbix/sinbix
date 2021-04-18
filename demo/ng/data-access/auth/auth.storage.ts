import { Injectable } from '@angular/core';
import { SxCookieStorage } from '@sinbix-angular/common/storage';
import * as _ from 'lodash';
import { AuthState } from './auth.store';

const authStorageKey = 'ask';

@Injectable()
export class AuthStorage {
  constructor(private storage: SxCookieStorage) {}

  getAuthData(): Promise<AuthState> {
    return this.storage
      .getItem(authStorageKey)
      .then((authToken) => (authToken ? JSON.parse(authToken) : null));
  }

  saveAuthData(data: AuthState) {
    return this.storage.setItem(authStorageKey, JSON.stringify(data));
  }

  clearAuthData() {
    return this.storage.removeItem(authStorageKey);
  }
}
