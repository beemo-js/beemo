/**
 * Dependency Injection container.
 * Services are registered and accessed via this class.
 */
export class Container {
    /**
     * Actual container.
     */
    private container = {
        // Instantiated services
        services: new Map<string|Function, any>(),

        // Functions that return a service
        instantiators: new Map<string|Function, Function>()
    }

    /**
     * Register a service instantiator.
     * @param force If not set to true and an instantiator has already been registered, an exception is thrown.
     */
    set<T>(id: string|Function, instantiator: () => T, force: boolean = false): this {
        if (!force && this.container.instantiators.has(id)) {
            throw `Tried to register twice service ${id} to DI container.`
        }

        this.container.instantiators.set(id, instantiator)
        return this
    }

    /**
     * Get asked service, instantiating it if not existent.
     */
    get<T>(id: string|Function): T {
        // if service already exists, return it
        const foundService = this.container.services.get(id)
        if (foundService !== undefined) {
            return foundService
        }

        // otherwise instantiate it and return it
        const instantiator = this.container.instantiators.get(id)
        if (instantiator !== undefined) {
            const service = instantiator()
            this.container.services.set(id, service)
            return service
        }

        // service undefined
        throw `Tried to get non-existing service ${id}.`
    }

    /**
     * Says if given service is registered.
     */
    has(id: string|Function): boolean {
        return this.container.services.has(id)
            || this.container.instantiators.has(id)
    }
}
