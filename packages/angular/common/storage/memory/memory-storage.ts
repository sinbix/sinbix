import { Injectable } from '@angular/core';
import { MemoryStore } from './memory-store';
import { Storage } from '../utils';

@Injectable({ providedIn: 'root' })
export class SxMemoryStorage extends Storage {
  constructor() {
    super(new MemoryStore());
  }
}
