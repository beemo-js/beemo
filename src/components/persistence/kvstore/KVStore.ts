export interface KVStore {
    all<T>(): Promise<T[]>
    get<T>(key: string): Promise<T>
    set<T>(key: string, value: T): Promise<boolean>
    has(key: string): Promise<boolean>
    delete(key: string): Promise<boolean>
}
