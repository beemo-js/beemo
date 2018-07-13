import {KVStore} from '../persistence'

/**
 * Interface for caching.
 */
export class Cache {
    constructor(
        private store: KVStore
    ) {}

    /**
     * Returns the result of fn from cache if available, else by calling fn and caching the result under the key cacheKey.
     */
    async withCache<T>(cacheKey: string, fn: () => T): Promise<T> {
        if (!await this.store.has(cacheKey)) {
            await this.store.set(cacheKey, fn())
        }

        return this.store.get<T>(cacheKey)
    }
}