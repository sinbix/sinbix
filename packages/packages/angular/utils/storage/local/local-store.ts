import { Storage as StorageCap } from '@capacitor/core';
import { StorageStore } from '../utils';

export class LocalStore implements StorageStore {
  clear(): Promise<void> {
    return StorageCap.clear();
  }

  async getItem(key: string): Promise<string> {
    return (await StorageCap.get({ key }))?.value;
  }

  async key(index: number): Promise<string> {
    return (await StorageCap.keys())?.keys?.[index];
  }

  removeItem(key: string): Promise<void> {
    return StorageCap.remove({ key });
  }

  setItem(key: string, value: string): Promise<void> {
    return StorageCap.set({ key, value });
  }

  async getLength(): Promise<number> {
    return (await StorageCap.keys())?.keys?.length ?? 0;
  }
}
