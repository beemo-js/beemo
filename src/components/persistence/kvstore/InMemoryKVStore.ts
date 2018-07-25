import {KVStore} from './KVStore'

export class InMemoryKVStore implements KVStore {
    private store = new Map<string, any>()

    all(): Promise<(Object|Object[])[]> {
        const result = Array.from(this.store).map(i => i[1])
        return Promise.all(result)
    }

    get(key: string): Promise<Object|Object[]> {
        return this.store.get(key)
    }

    async set(key: string, value: Object|Object[]): Promise<boolean> {
        await this.store.set(key, value)
        return true
    }

    async has(key: string): Promise<boolean> {
        return this.store.has(key)
    }

    async delete(key: string): Promise<boolean> {
        await this.store.delete(key)
        return true
    }
}