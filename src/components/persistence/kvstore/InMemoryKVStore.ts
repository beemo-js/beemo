import {KVStore} from './KVStore'

export class InMemoryKVStore implements KVStore {
    private store = new Map<string, any>()

    all<T>(): Promise<T[]> {
        const result = Array.from(this.store).map(i => i[1]) as T[];
        return Promise.all(result)
    }

    get<T>(key: string): Promise<T> {
        return this.store.get(key);
    }

    async has<T>(key: string): Promise<boolean> {
        return this.store.has(key);
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