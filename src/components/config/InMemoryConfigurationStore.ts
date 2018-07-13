import {ConfigurationStore} from '.'

/**
 * In-memory configuration store.
 */
export class InMemoryConfigurationStore implements ConfigurationStore {

    constructor(
        private configuration: Object = {}
    ) {}

    get(key: string): any {
        try {
            return key.split('.').reduce((conf,part) => conf[part], this.configuration)
        } catch (_) {
            return undefined
        }
    }

    set(key: string, value: any): void {
        const path = key.split('.')
        const finalKey = path.pop()
        let config = this.configuration
        path.forEach(i => {
            if (!config[i]) config[i] = {}
            config = config[i]
        })
        config[finalKey] = value
    }
}
