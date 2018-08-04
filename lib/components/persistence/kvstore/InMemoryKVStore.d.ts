import { KVStore } from './KVStore';
export declare class InMemoryKVStore implements KVStore {
    private store;
    all(): Promise<(Object | Object[])[]>;
    get(key: string): Promise<Object | Object[]>;
    set(key: string, value: Object | Object[]): Promise<boolean>;
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
}
