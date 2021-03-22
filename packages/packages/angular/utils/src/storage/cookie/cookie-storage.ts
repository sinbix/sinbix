import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';

import { CookieStore } from './cookie-store';
import { Storage } from '../utils';

@Injectable({ providedIn: 'root' })
export class CookieStorage extends Storage {
  protected readonly store: CookieStore;

  constructor(private cookieService: CookieService) {
    super(new CookieStore(cookieService));
  }

  setItem(key: string, value: string, opts?: CookieOptions): Promise<void> {
    return this.store.setItem(key, value, opts);
  }
}
