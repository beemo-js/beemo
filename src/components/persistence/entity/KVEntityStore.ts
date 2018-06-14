import {KVStore} from '../kvstore/KVStore'
import {Entity} from './Entity'
import {EntityStore} from './EntityStore'

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

    async all(): Promise<E[]> {
        return await this.kvStore.all<E>()
    }

    async findById(id: Id): Promise<E> {
        return await this.kvStore.get<E>(this.entityPath(id))
    }

    async save(entity: E|E[]): Promise<boolean> {
        if (Array.isArray(entity)) {
            await entity.forEach(async e => await this.save(e))
            return true
        }

        return await this.kvStore.set(this.entityPath(entity.id), entity)
    }

    async existsById(id: Id): Promise<boolean> {
        return await this.kvStore.has(this.entityPath(id))
    }

    async deleteById(id: Id): Promise<boolean> {
        return await this.kvStore.delete(this.entityPath(id))
    }
}