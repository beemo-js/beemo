import { Entity } from './Entity';
import { EntityStore } from './EntityStore';
import { KVStore } from '../kvstore/KVStore';
import { Normalizer } from '../../serialization/Normalizer';
/**
 * Enity store implementation using a KV store.
 */
export declare abstract class KVEntityStore<E extends Entity<Id>, Id> implements EntityStore<E, Id> {
    protected kvStore: KVStore;
    protected normalizer: Normalizer;
    protected entityClass: Function;
    protected basePath: string;
    protected idToStringMapper: (id: Id) => string;
    protected pathSeparator: string;
    protected normalizationGroup: string;
    constructor(kvStore: KVStore, normalizer: Normalizer, entityClass: Function, basePath: string, idToStringMapper?: (id: Id) => string, pathSeparator?: string, normalizationGroup?: string);
    protected entityPath(id: Id): string;
    all(): Promise<E[]>;
    findById(id: Id): Promise<E>;
    save(entity: E | E[]): Promise<boolean>;
    existsById(id: Id): Promise<boolean>;
    deleteById(id: Id): Promise<boolean>;
}
