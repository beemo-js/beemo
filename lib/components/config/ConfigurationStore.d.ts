/**
 * Interface for configuration store. Configuration is accessed using string keys.
 */
export interface ConfigurationStore {
    /**
     * Get a configuration value.
     */
    get(key: string): any;
    /**
     * Set a configuration value.
     */
    set(key: string, value: any): void;
}
