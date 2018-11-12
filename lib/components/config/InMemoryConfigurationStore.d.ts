import { ConfigurationStore } from './ConfigurationStore';
/**
 * In-memory configuration store.
 */
export declare class InMemoryConfigurationStore implements ConfigurationStore {
    private configuration;
    constructor(configuration?: Object);
    get(key: string): any;
    set(key: string, value: any): void;
}
