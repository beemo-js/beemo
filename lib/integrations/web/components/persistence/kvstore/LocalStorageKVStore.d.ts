import { KVStore } from '../../../../../components/persistence';
import { Encoder } from '../../../../../components/serialization';
/**
 * Works only with literal objects
 */
export declare class LocalStorageKVStore implements KVStore {
    private encoder;
    constructor(encoder: Encoder);
    all(): Promise<(Object | Object[])[]>;
    get(key: string): Promise<Object | Object[]>;
    set(key: string, value: Object | Object[]): Promise<boolean>;
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
}
