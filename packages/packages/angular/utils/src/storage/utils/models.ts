export interface StorageStore {
  clear(): Promise<void>;

  getItem(key: string): Promise<string>;

  key(index: number): Promise<string>;

  removeItem(key: string): Promise<void>;

  setItem(key: string, value: string): Promise<void>;

  getLength(): Promise<number>;
}

export class Storage implements StorageStore {
  protected store: StorageStore;

  constructor(store: StorageStore) {
    this.store = store;
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async getItem(key: string): Promise<string> {
    return this.store.getItem(key);
  }

  async key(index: number): Promise<string> {
    return this.store.key(index);
  }

  async removeItem(key: string): Promise<void> {
    this.store.removeItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.setItem(key, value);
  }

  async getLength(): Promise<number> {
    return this.store.getLength();
  }
}
