import {KVStore} from './KVStore'

export class InMemoryKVStore implements KVStore {
    private store = new Map<string, any>()

    async get<T>(key: string): Promise<T> {
        return await this.store.get(key) as T;
    }

    async has<T>(key: string): Promise<boolean> {
        return await this.store.has(key);
    }

    async set<T>(key: string, value: T): Promise<boolean> {
        await this.store.set(key, value);
        return true
    }

    async delete(key: string): Promise<boolean> {
        await this.store.delete(key)
        return true
    }
}