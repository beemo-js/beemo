// Register a service to the container
import {container} from '../../../framework/globalContainer'
import {ReflectionServiceManager} from '../ReflectionServiceManager'
import {DiServiceName} from '../../../framework/services'

function Service(id?: string): ClassDecorator {
    return (target) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).registerService(target, id)
    }
}

// Registers a constructor param dependency
function Inject(id: string|Function): ParameterDecorator {
    return (target: any, _: string, index: number) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).addConstructorParameterDependency(target.constructor, index, id)
    }
}

// Registers a constructor param value configuration key
function FromConfig(key: string): ParameterDecorator {
    return (target: any, _: string, index: number) => {
        container.get<ReflectionServiceManager>(DiServiceName.ReflectionServiceManager).addConstructorParameterConfigDependency(target.constructor, index, key)
    }
}

export {
    Service,
    Inject,
    FromConfig
}