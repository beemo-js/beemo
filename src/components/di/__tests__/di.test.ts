import {FromConfig, Inject, Service} from '../annotations/annotations'
import {container} from '../../../framework/globalContainer'
import {initContainer} from '../../../framework/initContainer'
import {ConfigServiceName} from '../../../framework/services'
import {ConfigurationStore} from '../../config/ConfigurationStore'

initContainer()


container.set('someBean', () => 'some value')
container.get<ConfigurationStore>(ConfigServiceName.ConfigurationStore).set('example.config.key', 'value from config')

@Service() class InjectedService {}
@Service('randomName') class NamedService {}

@Service()
class FooService {

    constructor(
        public injectedService: InjectedService,
        @Inject('randomName') public namedService: NamedService,
        @Inject('someBean') public someBean: string,
        @FromConfig('example.config.key') public configValue: string,
        @Inject(InjectedService) public secondInjectedService
    ) {}

}

test('di', () => {
    const fooService = container.get<FooService>(FooService)
    expect(fooService).toBeInstanceOf(FooService)
    expect(fooService.injectedService).toBeInstanceOf(InjectedService)
    expect(fooService.namedService).toBeInstanceOf(NamedService)
    expect(fooService.someBean).toBe('some value')
    expect(fooService.configValue).toBe('value from config')
    expect(fooService.secondInjectedService).toBeInstanceOf(InjectedService)
})
