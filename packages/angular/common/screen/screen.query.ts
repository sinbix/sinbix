import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Screen } from './utils';
import { SxScreenStore } from './screen.store';

@Injectable({ providedIn: 'root' })
export class SxScreenQuery extends Query<Screen> {
  constructor(protected store: SxScreenStore) {
    super(store);
  }
}
