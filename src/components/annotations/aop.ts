import {middlewareType} from './types'

/**
 * Apply given middleware to function described by descriptor.
 */
export function applyMiddleware(descriptor: PropertyDescriptor, middleware: middlewareType): void {
    const originalFunction = descriptor.value

    descriptor.value = function(...args) {
        const next = args => originalFunction.apply(this, args)
        return middleware(next, args)
    }
}

/**
 * Return an AOP annotation that applies given middleware to annotated method.
 */
export function aopAnnotation(middleware: middlewareType): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        applyMiddleware(descriptor, middleware)
    }
}
