import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ISafeUser } from '@sinbix/demo/shared/types';

export interface AuthState {
  user: ISafeUser;
  token: string;
  expiration: Date;
}

export function createInitialState(): Partial<AuthState> {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }

  signin(state: AuthState) {
    this.update(state);
  }
}
