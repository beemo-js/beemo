import {KVStore} from '..'
import {Entity} from './Entity'
import {EntityStore} from './EntityStore'
import {Normalizer} from '../../serialization'

/**
 * Enity store implementation using a KV store.
 */
export abstract class KVEntityStore<E extends Entity<Id>, Id> implements EntityStore<E, Id> {
    constructor(
        protected kvStore: KVStore,
        protected normalizer: Normalizer,
        protected entityClass: Function,
        protected basePath: string,
        protected idToStringMapper: (id: Id) => string = id => id.toString(),
        protected pathSeparator: string = ':',
        protected normalizationGroup: string = 'storage',
    ) {}

    protected entityPath(id: Id): string {
        return this.basePath + this.pathSeparator + this.idToStringMapper(id)
    }

    async all(): Promise<E[]> {
        return (await this.kvStore.all())
            .map(item => this.normalizer.denormalize<E>(this.entityClass, item, this.normalizationGroup) as E)
    }

    async findById(id: Id): Promise<E> {
        const foundData = await this.kvStore.get(this.entityPath(id))
        return this.normalizer.denormalize<E>(this.entityClass, foundData, this.normalizationGroup) as E
    }

    async save(entity: E|E[]): Promise<boolean> {
        if (Array.isArray(entity)) {
            await entity.forEach(async e => await this.save(e))
            return true
        }

        return this.kvStore.set(this.entityPath(entity.id), this.normalizer.normalizeInstance(entity, this.normalizationGroup))
    }

    existsById(id: Id): Promise<boolean> {
        return this.kvStore.has(this.entityPath(id))
    }

    deleteById(id: Id): Promise<boolean> {
        return this.kvStore.delete(this.entityPath(id))
    }
}