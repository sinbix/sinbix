import { CookieService, CookieOptions } from 'ngx-cookie';
import * as _ from 'lodash';
import { StorageStore } from '../utils';

export class CookieStore implements StorageStore {
  constructor(private cookieService: CookieService) {}

  async clear(): Promise<void> {
    return this.cookieService.removeAll();
  }

  async getItem(key: string): Promise<string> {
    return this.cookieService.get(key);
  }

  async key(index: number): Promise<string> {
    return _.keys(this.cookieService.getAll())?.[index] ?? null;
  }

  async removeItem(key: string): Promise<void> {
    return this.cookieService.remove(key);
  }

  async setItem(
    key: string,
    value: string,
    opts?: CookieOptions
  ): Promise<void> {
    return await this.cookieService.put(key, value, opts);
  }

  async getLength(): Promise<number> {
    return _.keys(this.cookieService.getAll()).length ?? 0;
  }
}
