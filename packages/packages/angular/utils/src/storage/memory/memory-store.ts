import { Dictionary } from '@sinbix-common/utils';
import * as _ from 'lodash';
import { StorageStore } from '../utils';

export class MemoryStore implements StorageStore {
  /**
   * Storage data
   */
  private data: Dictionary<string> = {};

  async clear(): Promise<void> {
    this.data = {};
  }

  async getItem(key: string): Promise<string> {
    return this.data[key] ?? null;
  }

  async key(index: number): Promise<string> {
    return _.keys(this.data)?.[index] ?? null;
  }

  async removeItem(key: string): Promise<void> {
    delete this.data[key];
  }

  async setItem(key: string, value: string): Promise<void> {
    this.data[key] = value;
  }

  async getLength(): Promise<number> {
    return _.keys(this.data)?.length ?? 0;
  }
}
