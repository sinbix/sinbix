import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MemoryStore } from '../memory';
import { Storage } from '../utils';
import { LocalStore } from './local-store';

@Injectable({ providedIn: 'root' })
export class SxLocalStorage extends Storage {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    super(isPlatformBrowser(platformId) ? new LocalStore() : new MemoryStore());
  }
}
