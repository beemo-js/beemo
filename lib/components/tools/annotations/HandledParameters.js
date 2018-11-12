import { ValidatedParameters } from '../../validation/annotations/ValidatedParameters';
import { ConvertedParameters } from '../../conversion/annotations/ConvertedParameters';
/**
 * Handle method parameters converters and validators.
 */
export function HandledParameters() {
    return (target, method, descriptor) => {
        ValidatedParameters()(target, method, descriptor);
        ConvertedParameters()(target, method, descriptor);
    };
}
