import {InMemoryKVStore, Entity, KVEntityStore, KVStore} from '..'
import {MappedField, Normalizer} from '../../serialization'
import {container, initContainer, SerializationServiceName} from '../../../framework'

initContainer()

test('KVEntityStore', async () => {
    class User implements Entity<number> {
        @MappedField() id: number
        @MappedField() name: string
    }

    class UserStore extends KVEntityStore<User, number> {
        constructor(
            kvStore: KVStore,
            normalizer: Normalizer
        ) {
            super(kvStore, normalizer, User, 'User')
        }
    }


    const kvStore = new InMemoryKVStore()
    const normalizer = container.get<Normalizer>(SerializationServiceName.Normalizer)
    const userStore = new UserStore(kvStore, normalizer)

    const user = new User()
    user.id = 2
    user.name = 'test-user'

    await userStore.save(user)

    const foundUser = await userStore.findById(2)
    expect(foundUser.id).toBe(2)
    expect(foundUser.name).toBe('test-user')

    expect(await userStore.all()).toContainEqual(user)
})
