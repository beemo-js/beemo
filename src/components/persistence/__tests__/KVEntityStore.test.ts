import {InMemoryKVStore, Entity, KVEntityStore, KVStore} from '..'

test('KVEntityStore', async () => {
    class User implements Entity<number> {
        id: number
        name: string
    }

    class UserStore extends KVEntityStore<User, number> {
        constructor(
            kvStore: KVStore
        ) {
            super(kvStore, 'User')
        }
    }


    const kvStore = new InMemoryKVStore()
    const userStore = new UserStore(kvStore)

    const user = new User()
    user.id = 2
    user.name = 'test-user'

    await userStore.save(user)

    const foundUser = await userStore.findById(2)
    expect(foundUser.id).toBe(2)
    expect(foundUser.name).toBe('test-user')

    expect(await userStore.all()).toContain(user)
})
