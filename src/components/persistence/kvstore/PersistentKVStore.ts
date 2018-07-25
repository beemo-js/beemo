import {KVStore} from './KVStore'
import {Encoder} from '../../serialization'

/**
 * Works only with literal objects
 */
export class PersistentKVStore implements KVStore {
    constructor(
        private encoder: Encoder
    ) {}

    async all(): Promise<(Object|Object[])[]> {
        return Object.keys(localStorage)
            .map(key => localStorage.getItem(key))
            .map(item => this.encoder.decode(item))
    }

    async get(key: string): Promise<Object|Object[]> {
        return this.encoder.decode(localStorage.getItem(key))
    }

    async set(key: string, value: Object|Object[]): Promise<boolean> {
        await localStorage.setItem(key, this.encoder.encode(value))
        return true
    }

    async has(key: string): Promise<boolean> {
        return !!localStorage.getItem(key)
    }

    async delete(key: string): Promise<boolean> {
        await localStorage.removeItem(key)
        return true
    }
}