import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { Screen } from './utils';

export function createInitialState(): Screen {
  return {
    width: 0,
    height: 0,
    orientation: 'landscape',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sceen' })
export class ScreenStore extends Store<Screen> {
  constructor() {
    super(createInitialState());
  }
}
