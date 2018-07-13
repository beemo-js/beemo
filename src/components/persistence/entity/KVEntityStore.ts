import {KVStore} from '../kvstore/KVStore'
import {Entity} from './Entity'
import {EntityStore} from './EntityStore'

/**
 * Enity store implementation using a KV store.
 */
export abstract class KVEntityStore<E extends Entity<Id>, Id> implements EntityStore<E, Id> {
    constructor(
        protected kvStore: KVStore,
        protected basePath: string,
        protected idToStringMapper: (id: Id) => string = id => id.toString(),
        protected pathSeparator: string = ':'
    ) {}

    protected entityPath(id: Id): string {
        return this.basePath + this.pathSeparator + this.idToStringMapper(id)
    }

    all(): Promise<E[]> {
        return this.kvStore.all<E>()
    }

    findById(id: Id): Promise<E> {
        return this.kvStore.get<E>(this.entityPath(id))
    }

    async save(entity: E|E[]): Promise<boolean> {
        if (Array.isArray(entity)) {
            await entity.forEach(async e => await this.save(e))
            return true
        }

        return this.kvStore.set(this.entityPath(entity.id), entity)
    }

    existsById(id: Id): Promise<boolean> {
        return this.kvStore.has(this.entityPath(id))
    }

    deleteById(id: Id): Promise<boolean> {
        return this.kvStore.delete(this.entityPath(id))
    }
}