import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ThemeStore, ThemeState } from './theme.store';
import { Theme } from './utils';

@Injectable()
export class ThemeQuery extends QueryEntity<ThemeState, Theme> {
  constructor(protected store: ThemeStore) {
    super(store);
  }
}
