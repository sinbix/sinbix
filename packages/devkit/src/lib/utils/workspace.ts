export type DefinitionCollectionListener<V extends object> = (
  name: string,
  action: 'add' | 'remove' | 'replace',
  newValue: V | undefined,
  oldValue: V | undefined,
  collection: DefinitionCollection<V>,
) => void;

export class DefinitionCollection<V extends object> implements ReadonlyMap<string, V> {
  private readonly _map: Map<string, V>;

  constructor(
    initial?: Record<string, V>,
    private _listener?: DefinitionCollectionListener<V>
  ) {
    this._map = new Map(initial && Object.entries(initial));
  }

  delete(key: string): boolean {
    const value = this._map.get(key);
    const result = this._map.delete(key);
    if (result && value !== undefined && this._listener) {
      this._listener(key, 'remove', undefined, value, this);
    }

    return result;
  }

  set(key: string, value: V): this {
    const existing = this.get(key);
    this._map.set(key, value);

    if (this._listener) {
      this._listener(
        key,
        existing !== undefined ? 'replace' : 'add',
        value,
        existing,
        this
      );
    }

    return this;
  }

  forEach<T>(
    callbackfn: (value: V, key: string, map: DefinitionCollection<V>) => void,
    thisArg?: T
  ): void {
    this._map.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }

  get(key: string): V | undefined {
    return this._map.get(key);
  }

  has(key: string): boolean {
    return this._map.has(key);
  }

  get size(): number {
    return this._map.size;
  }

  [Symbol.iterator](): IterableIterator<[string, V]> {
    return this._map[Symbol.iterator]();
  }

  entries(): IterableIterator<[string, V]> {
    return this._map.entries();
  }

  keys(): IterableIterator<string> {
    return this._map.keys();
  }

  values(): IterableIterator<V> {
    return this._map.values();
  }
}
