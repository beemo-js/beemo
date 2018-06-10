import {ConfigurationStore} from './ConfigurationStore'

export class StackableConfigurationStore implements ConfigurationStore {

  constructor(
    public readonly configurationStores: ConfigurationStore[]
  ) {}

  get(key: string): any {
    for (let configStore of this.configurationStores) {
      let configValue = configStore.get(key)
      if (configValue !== undefined && configValue !== null) {
        return configValue
      }
    }

    return undefined
  }

  set(key: string, value: any): void {
    throw `Tried to set a configuration value to a StackableConfiguration (key: ${key}). ` +
      'You should instead modify the configuration via one of the configurationStores'
  }
}