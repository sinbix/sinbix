import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ISafeUser } from '@sinbix/demo/apps/shared/types';

export function createInitialState(): Partial<ISafeUser> {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<ISafeUser> {
  constructor() {
    super(createInitialState());
  }
}
