export class Container {
    private container = {
        services: new Map<string|Function, any>(),
        instantiators: new Map<string|Function, Function>()
    }

    set<T>(id: string|Function, instantiator: () => T, force: boolean = false): this {
        if (!force && this.container.instantiators.has(id)) {
            throw `Tried to register twice service ${id} to DI container.`
        }

        this.container.instantiators.set(id, instantiator)
        return this
    }

    get<T>(id: string|Function): T {
        const foundService = this.container.services.get(id)
        if (foundService !== undefined) {
            return foundService
        }

        const instantiator = this.container.instantiators.get(id)
        if (instantiator !== undefined) {
            const service = instantiator()
            this.container.services.set(id, service)
            return service
        }

        throw `Tried to get non-existing service ${id}.`
    }

    has(id: string|Function): boolean {
        return this.container.services.has(id)
            || this.container.instantiators.has(id)
    }
}
