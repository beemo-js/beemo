import {ConvertedParameters} from '../../conversion/annotations/ConvertedParameters'
import {ValidatedParameters} from '../../validation/annotations/ValidatedParameters'

export function HandledParameters(): MethodDecorator {
    return (target: any, method: string, descriptor: PropertyDescriptor) => {
        ValidatedParameters()(target, method, descriptor)
        ConvertedParameters()(target, method, descriptor)
    }
}
