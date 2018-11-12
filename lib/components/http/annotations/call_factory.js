import { applyMiddleware } from '../../annotations/aop';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, HttpServiceName } from '../../../framework/services';
/**
 * Fills the call returned from method with data in parameters.
 */
export function HandledCall() {
    return (target, propertyKey, descriptor) => {
        applyMiddleware(descriptor, (next, args) => {
            const call = next(args);
            container.get(HttpServiceName.CallAnnotationsHandler)
                .handle(call, target.constructor, propertyKey, args);
            return call;
        });
    };
}
/**
 * Maps given parameter to call request's body.
 *
 * @param classFn class to refer to when serializing the parameter.
 */
export function Body(classFn) {
    return (target, propertyKey, parameterIndex) => {
        container.get(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Body, { classFn });
    };
}
/**
 * Maps given parameter to call request's url parameters.
 */
export function UrlParam(name) {
    return (target, propertyKey, parameterIndex) => {
        container.get(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, UrlParam, { name });
    };
}
/**
 * Maps given parameter to call request's headers.
 */
export function Header(name) {
    return (target, propertyKey, parameterIndex) => {
        container.get(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Header, { name });
    };
}
