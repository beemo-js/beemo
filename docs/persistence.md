# Persistence

The persistence module provides abstractions to persist data in your app.

## Key-Value store

There are currently 2 types of Key-Value stores: in-memory and persistent.

### In-memory KV store

The in-memory key-value store stores data, as you would guess, in memory. It means it will be cleared when closing the app.

```ts
const kvStore = new InMemoryKVStore()

kvStore.set('key', 'value')
kvStore.get<string>('key') // -> 'value'
kvStore.has('key') // -> true
kvStore.delete('key')
```

### Persistent KV store

The persistent key-value store persists data so that it is not lost when closing the app.

In the web integration this store is implemented using localStorage.

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
    constructor(kvStore: KVStore, normalizer: Normalizer) {
        super(kvStore, normalizer, User, 'User') // 'User' is the base path to user entities in the KV store
    }
}
```

```ts
const user = new User(2, 'test-user')

userStore.save(user)
const foundUser = await userStore.findById(21)
```

The methods provided by the store are defined in the [EntityStore interface](./src/components/persistence/entity/EntityStore.ts).
