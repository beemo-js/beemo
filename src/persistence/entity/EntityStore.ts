import {Entity} from './Entity'

export interface EntityStore<E extends Entity<Id>, Id> {
    findById(id: Id): Promise<E>
    save(entity: E): Promise<boolean>
    existsById(id: Id): Promise<boolean>
    deleteById(id: Id): Promise<boolean>
}