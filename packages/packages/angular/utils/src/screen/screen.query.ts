import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Screen } from './utils';
import { ScreenStore } from './screen.store';
import { ScreenService } from './screen.service';

@Injectable({ providedIn: 'root' })
export class ScreenQuery extends Query<Screen> {
  constructor(protected store: ScreenStore, protected service: ScreenService) {
    super(store);
  }
}
