import { Injectable } from '@angular/core';
import { LocalStorage } from '@sinbix-angular/utils';
import * as _ from 'lodash';
import { AuthState } from './auth.store';

const authStorageKey = 'ask';

@Injectable({ providedIn: 'root' })
export class AuthStorage {
  constructor(private storageCookie: LocalStorage) {}

  async getAuthData(): Promise<AuthState> {
    const authToken = await this.storageCookie.getItem(authStorageKey);
    return authToken ? JSON.parse(authToken) : null;
  }

  saveAuthData(data: AuthState) {
    return this.storageCookie.setItem(authStorageKey, JSON.stringify(data));
  }

  clearAuthData() {
    return this.storageCookie.removeItem(authStorageKey);
  }
}
