import {Entity} from '../persistence/entity/Entity'
import {KVEntityStore} from '../persistence/entity/KVEntityStore'
import {KVStore} from '../persistence/kvstore/KVStore'
import {CallFactory} from '../http/factory/call/CallFactory'
import {Request} from '../http/abstractions/Request'
import {Call} from '../http/call/Call'
import {CallHttpClient} from '../http/call/CallHttpClient'
import {Repository} from "./Repository";

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

class UserClient extends CallFactory {
    constructor() {
        super(User, new Request('/users'))
    }

    getFromId(id: number): Call<User> {
        return this.get(`/${id}`)
    }
}

class UserRepository extends Repository {
    constructor(
        private callHttpClient: CallHttpClient,
        private userStore: UserStore,
        private userClient: UserClient
    ) {
        super()
    }

    async *getUserFromId(id: number): AsyncIterator<User> {
        return this.getFromCacheAndRequest(
            () => this.userStore.findById(id),
            () => this.callHttpClient.retrieveData(this.userClient.getFromId(id)),
            async user => await this.userStore.save(user)
        )
    }
}
