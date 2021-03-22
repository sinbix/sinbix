import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Screen } from './utils';
import { ScreenStore } from './screen.store';

@Injectable({ providedIn: 'root' })
export class ScreenQuery extends Query<Screen> {
  constructor(protected store: ScreenStore) {
    super(store);
  }
}
