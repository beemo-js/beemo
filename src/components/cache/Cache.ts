import {KVStore} from '../persistence/kvstore/KVStore'

export class Cache {
    constructor(
        private store: KVStore
    ) {}

    async withCache<T>(cacheKey: string, fn: () => T): Promise<T> {
        if (! await this.store.has(cacheKey)) {
            await this.store.set(cacheKey, fn())
        }

        return await this.store.get<T>(cacheKey)
    }
}