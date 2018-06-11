import {Entity} from '../persistence/entity/Entity'
import {KVEntityStore} from '../persistence/entity/KVEntityStore'
import {KVStore} from '../persistence/kvstore/KVStore'
import {CallFactory} from '../http/factory/call/CallFactory'
import {Request} from '../http/abstractions/Request'
import {Call} from '../http/call/Call'
import {CallHttpClient} from '../http/call/CallHttpClient'

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

class UserClient extends CallFactory<User> {
    constructor() {
        super(User, new Request('/users'))
    }

    getFromId(id: number): Call<User> {
        return this.get(`/${id}`)
    }
}

class UserRepository {
    constructor(
        private userStore: UserStore,
        private userClient: UserClient,
        private callHttpClient: CallHttpClient
    ) {}

    async *getFromCacheAndRequest(fromCache: () => Promise<User>, fromRequest: () => Promise<User>): AsyncIterator<User> {
        const entityFromCache = await fromCache()
        if (entityFromCache) {
            yield entityFromCache
        }

        const entityFromRequest = await fromRequest()
        await this.userStore.save(entityFromRequest)
        yield entityFromRequest
    }

    async *getUserFromId(id: number): AsyncIterator<User> {
        return this.getFromCacheAndRequest(
            () => this.userStore.findById(id),
            () => this.callHttpClient.retrieveData(this.userClient.getFromId(id))
        )
    }
}

class UserPage {
    constructor(
        private userRepository: UserRepository,
        private userViewModel: UserViewModel
    ) {}

    async init() {
        this.withResource(
            () => this.userRepository.getUserFromId(21),
            user => this.userViewModel.user = user
        )
    }

    async withResource(getResource: () => AsyncIterator<User>, action: (resource: User) => void) {
        const source = getResource()
        let resource
        while(resource = await source.next()) {
            action(resource)
        }
    }
}

class UserViewModel {
    constructor(
        public user: User
    ) {}
}
