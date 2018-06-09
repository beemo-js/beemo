
export interface ConfigurationStore {
    get(key: string): any
    set(key: string, value: any): void
}
