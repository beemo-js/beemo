// Register a service to the container
import {container} from '../../../framework/globalContainer'
import {ReflectionServiceManager} from '../ReflectionServiceManager'
import {DiServiceName} from '../../../framework/services'

/**
 * Declares annotated class as a service (i.e. registers it in services container).
 * @param id Name of the service; if not provided it will be accessed via its constructor.
 */
export function Service(id?: string): ClassDecorator {
    return (target) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).registerService(target, id)
    }
}

/**
 * Registers a constructor param dependency.
 */
export function Inject(id: string|Function): ParameterDecorator {
    return (target: any, _: string, index: number) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).addConstructorParameterDependency(target.constructor, index, id)
    }
}

/**
 * Registers a constructor param value configuration key.
 * The value will be retrieved from configuration.
 */
export function FromConfig(key: string): ParameterDecorator {
    return (target: any, _: string, index: number) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).addConstructorParameterConfigDependency(target.constructor, index, key)
    }
}
