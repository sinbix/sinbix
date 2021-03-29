import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  user$ = this.select((state) => state.user);

  profile$ = this.select((state) => state.user?.profile);

  firstName$ = this.profile$.pipe(map((profile) => profile?.firstName));

  lastName$ = this.profile$.pipe(map((profile) => profile?.lastName));

  fullName$ = this.profile$.pipe(
    map((profile) => `${profile?.firstName} ${profile?.lastName}`)
  );

  email$ = this.select((state) => state.user?.email);

  isAuth$ = this.select((state) => toBoolean(state.token));

  constructor(protected store: AuthStore) {
    super(store);
  }

  getUser() {
    return this.getValue()?.user;
  }
}
