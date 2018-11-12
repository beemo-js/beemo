import {initContainer} from '../../../framework/initContainer'
import {Entity} from '../entity/Entity'
import {MappedField} from '../../serialization/annotations/annotations'
import {KVEntityStore} from '../entity/KVEntityStore'
import {KVStore} from '../kvstore/KVStore'
import {Normalizer} from '../../serialization/Normalizer'
import {InMemoryKVStore} from '../kvstore/InMemoryKVStore'
import {container} from '../../../framework/globalContainer'
import {SerializationServiceName} from '../../../framework/services'

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
