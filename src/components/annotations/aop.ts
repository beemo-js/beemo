// AOP

export function applyMiddleware(descriptor: PropertyDescriptor, middleware: (next, args) => any): void {
    const originalFunction = descriptor.value

    descriptor.value = function(...args) {
        const next = args => originalFunction.apply(this, args)
        return middleware(next, args)
    }
}

export function aopAnnotation(middleware: (next, args) => any): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        applyMiddleware(descriptor, middleware)
    }
}
