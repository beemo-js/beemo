import { Constraints as ValidatorAnnotation } from './constraints';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, ValidationServiceName } from '../../../framework/services';
import { applyMiddleware } from '../../annotations/aop';
/**
 * Validates method parameters.
 */
export function ValidatedParameters() {
    return (target, method, descriptor) => {
        const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
        const validator = container.get(ValidationServiceName.Validator);
        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ValidatedParameters, {});
        applyMiddleware(descriptor, (next, args) => {
            args.forEach((arg, index) => {
                const validatorsData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, ValidatorAnnotation)
                    .map(i => i.data);
                const errors = validator.validate(arg, validatorsData);
                if (errors.length > 0) {
                    throw `Invalid argument: ${errors[0].message}`;
                }
            });
            return next(args);
        });
    };
}
