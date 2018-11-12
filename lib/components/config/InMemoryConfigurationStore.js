/**
 * In-memory configuration store.
 */
export class InMemoryConfigurationStore {
    constructor(configuration = {}) {
        this.configuration = configuration;
    }
    get(key) {
        try {
            return key.split('.').reduce((conf, part) => conf[part], this.configuration);
        }
        catch (_) {
            return undefined;
        }
    }
    set(key, value) {
        const path = key.split('.');
        const finalKey = path.pop();
        let config = this.configuration;
        path.forEach(i => {
            if (!config[i])
                config[i] = {};
            config = config[i];
        });
        config[finalKey] = value;
    }
}
