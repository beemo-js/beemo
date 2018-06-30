# Persistence

The persistence module provides abstractions to persist data in your app.

## Key-Value store

```ts
const kvStore = new InMemoryKVStore()

kvStore.set('key', 'value')
kvStore.get<string>('key') // -> 'value'
kvStore.has('key') // -> true
kvStore.delete('key')
```

## Entity store

The entity store is a specialized version of the persistence store. It provides methods to handle persistence of entities (entities implement the `Entity` interface or at least have an `id` field).

```ts
class User implements Entity<number> {
    constructor(
        public id: number,
        public name: string
    ) {}
}

class UserStore extends KVEntityStore<User, number> {
    constructor(kvStore: KVStore) {
        super(kvStore, 'User')
    }
}

```

```ts
const user = new User(2, 'test-user')

userStore.save(user)
const foundUser = await userStore.findById(21)
```
