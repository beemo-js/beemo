import {FromConfig, Inject, Service} from './annotations/annotations'
import {container} from '../framework/globalContainer'
import {initContainer} from '../framework/initContainer'
import {ConfigServiceName} from '../framework/services'
import {ConfigurationStore} from '../config/ConfigurationStore'

initContainer()


// Tests

container.set('someBean', () => 'some value')

@Service() class InjectedService {}
@Service('randomName') class NamedService {}

@Service()
class MetadataTest {

    constructor(
        private injectedService: InjectedService,
        @Inject('randomName') private namedService: NamedService,
        @Inject('someBean') private someBean: string,
        @FromConfig('example.config.key') private configValue: string,
        @Inject(InjectedService) private secondInjectedService
    ) {}

}

container.get<ConfigurationStore>(ConfigServiceName.ConfigurationStore).set('example.config.key', 'value from config')
console.log(container.get(MetadataTest))
// console.log(container.get('InjectedService'))
// console.log(container)
// console.log(container.get<ClassMetadataStore>(ConfigServiceName.ConfigurationStore).getConstructorParametersData(MetadataTest))
