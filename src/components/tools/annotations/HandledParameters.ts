import {ConvertedParameters} from '../../conversion'
import {ValidatedParameters} from '../../validation'

/**
 * Handle method parameters converters and validators.
 */
export function HandledParameters(): MethodDecorator {
    return (target: any, method: string, descriptor: PropertyDescriptor) => {
        ValidatedParameters()(target, method, descriptor)
        ConvertedParameters()(target, method, descriptor)
    }
}
