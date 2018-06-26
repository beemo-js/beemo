import {Entity} from './Entity'

export interface EntityStore<E extends Entity<Id>, Id> {
    /**
     * Find an entity by id.
     */
    findById(id: Id): Promise<E>

    /**
     * Create or update an entity in store.
     */
    save(entity: E|E[]): Promise<boolean>

    /**
     * Says if an entity with given id exists.
     */
    existsById(id: Id): Promise<boolean>

    /**
     * Deletes an entity by id.
     */
    deleteById(id: Id): Promise<boolean>
}