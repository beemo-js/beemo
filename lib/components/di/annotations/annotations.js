import { container } from '../../../framework/globalContainer';
import { DiServiceName } from '../../../framework/services';
/**
 * Declares annotated class as a service (i.e. registers it in services container).
 * @param id Name of the service; if not provided it will be accessed via its constructor.
 */
export function Service(id) {
    return (target) => {
        container.get(DiServiceName.ReflectionServiceManager).registerService(target, id);
    };
}
/**
 * Registers a constructor param dependency.
 */
export function Inject(id) {
    return (target, _, index) => {
        container.get(DiServiceName.ReflectionServiceManager).addConstructorParameterDependency(target.constructor, index, id);
    };
}
/**
 * Registers a constructor param value configuration key.
 * The value will be retrieved from configuration.
 */
export function FromConfig(key) {
    return (target, _, index) => {
        container.get(DiServiceName.ReflectionServiceManager).addConstructorParameterConfigDependency(target.constructor, index, key);
    };
}
