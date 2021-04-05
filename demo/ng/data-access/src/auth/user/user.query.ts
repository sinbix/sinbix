import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { ISafeUser } from '@sinbix/demo/apps/shared/types';
import { concat } from 'rxjs';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<ISafeUser> {
  email$ = this.select((state) => state.email);

  profile$ = this.select((state) => state.profile);

  firstName$ = this.select((state) => state.profile?.firstName);

  lastName$ = this.select((state) => state.profile?.lastName);

  fullName$ = concat(this.firstName$, ' ', this.lastName$);

  constructor(protected store: UserStore) {
    super(store);
  }
}
