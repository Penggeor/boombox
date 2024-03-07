if(!global.localStorage) {
  throw new Error('Local storage is not supported')
}
if(!global.sessionStorage) {
  throw new Error('Session storage is not supported')
}

class ExtendedStorage extends Storage {
  constructor(storage: Storage,
    serialize = JSON.stringify,
    deserialize = JSON.parse
    ) {
    super()
    this.storage = storage
    this.serialize = serialize
    this.deserialize = deserialize
  }

  public setItem(key: string, value: any) {
    this.storage.setItem(key, this.serialize(value))
  }

  public getItem(key: string) {
    const value = this.storage.getItem(key)
    if(value) {
      return this.deserialize(value)
    }
    return value
  }
}

export class LocalStorage extends ExtendedStorage {
  constructor() {
    super(global.localStorage)
  }
}

export class SessionStorage extends ExtendedStorage {
  constructor() {
    super(global.sessionStorage)
  }
}

export const localStorage = new LocalStorage()
export const sessionStorage = new SessionStorage()
