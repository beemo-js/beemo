# Persistence

## Key-Value store

```ts
kvStore.set('key', 'value')
kvStore.get<string>('key') // -> 'value'
kvStore.has('key') // -> true
kvStore.delete('key')
```

## Entity store

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