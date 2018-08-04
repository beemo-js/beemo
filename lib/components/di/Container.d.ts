/**
 * Dependency Injection container.
 * Services are registered and accessed via this class.
 */
export declare class Container {
    /**
     * Actual container.
     */
    private container;
    /**
     * Register a service instantiator.
     * @param force If not set to true and an instantiator has already been registered, an exception is thrown.
     */
    set<T>(id: string | Function, instantiator: () => T, force?: boolean): this;
    /**
     * Get asked service, instantiating it if not existent.
     */
    get<T>(id: string | Function): T;
    /**
     * Says if given service is registered.
     */
    has(id: string | Function): boolean;
}
