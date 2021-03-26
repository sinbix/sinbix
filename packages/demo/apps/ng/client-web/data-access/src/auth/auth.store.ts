import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AuthState {
  userId: number;
  token: string;
  expiration: Date;
}

export function createInitialState(): AuthState {
  return {
    userId: null,
    token: null,
    expiration: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }

  signin(state: AuthState) {
    this.update(state);
  }

  clear() {
    this.update(createInitialState());
  }
}
