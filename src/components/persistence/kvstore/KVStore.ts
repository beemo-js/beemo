/**
 * Key-Value store.
 */
export interface KVStore {
    all(): Promise<Object[]>
    get(key: string): Promise<Object|Object[]>
    set(key: string, value: Object|Object[]): Promise<boolean>
    has(key: string): Promise<boolean>
    delete(key: string): Promise<boolean>
}
