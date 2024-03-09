if (!globalThis.localStorage) {
  throw new Error('Local storage is not supported');
}
if (!globalThis.sessionStorage) {
  throw new Error('Session storage is not supported');
}

type IExtendedStorage = Omit<Storage, 'setItem' | 'getItem'> & {
  setItem(key: string, value: unknown): void;
  getItem(key: string): unknown;
  serialize: (value: unknown) => string;
  deserialize: (value: string) => unknown;
};

class ExtendedStorage implements IExtendedStorage {
  private storage: Storage;
  serialize: (value: unknown) => string;
  deserialize: (value: string) => unknown;

  get length() {
    return this.storage.length;
  }
  clear: Storage['clear'];
  removeItem: Storage['removeItem'];
  key: Storage['key'];

  constructor(
    storage: Storage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  ) {
    this.storage = storage;
    this.serialize = serialize;
    this.deserialize = deserialize;

    this.clear = this.storage.clear.bind(this.storage);
    this.removeItem = this.storage.removeItem.bind(this.storage);
    this.key = this.storage.key.bind(this.storage);
  }

  setItem(key: string, value: unknown) {
    this.storage.setItem(key, this.serialize(value));
  }

  getItem(key: string): unknown {
    const value = this.storage.getItem(key);
    if (value) {
      return this.deserialize(value);
    }
    return value;
  }
}

export class LocalStorage extends ExtendedStorage {
  constructor() {
    super(globalThis.localStorage);
  }
}

export class SessionStorage extends ExtendedStorage {
  constructor() {
    super(globalThis.sessionStorage);
  }
}

export const localStorage = new LocalStorage();
export const sessionStorage = new SessionStorage();
