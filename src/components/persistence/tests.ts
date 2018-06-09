import {InMemoryKVStore} from './kvstore/InMemoryKVStore'
import {Entity} from './entity/Entity'
import {KVEntityStore} from './entity/KVEntityStore'
import {KVStore} from './kvstore/KVStore'

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

userRepository.save(user)

userRepository.findById(2).then(user => console.log(user))
