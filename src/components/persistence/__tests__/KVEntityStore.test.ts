import {InMemoryKVStore} from '../kvstore/InMemoryKVStore'
import {Entity} from '../entity/Entity'
import {KVEntityStore} from '../entity/KVEntityStore'
import {KVStore} from '../kvstore/KVStore'


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
    const userRepository = new UserStore(kvStore)

    const user = new User()
    user.id = 2
    user.name = 'test-user'

    await userRepository.save(user)

    const foundUser = await userRepository.findById(2)
    expect(foundUser.id).toBe(2)
    expect(foundUser.name).toBe('test-user')
})
