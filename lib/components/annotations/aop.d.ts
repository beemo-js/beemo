import { middlewareType } from './types';
/**
 * Apply given middleware to function described by descriptor.
 */
export declare function applyMiddleware(descriptor: PropertyDescriptor, middleware: middlewareType): void;
/**
 * Return an AOP annotation that applies given middleware to annotated method.
 */
export declare function aopAnnotation(middleware: middlewareType): MethodDecorator;
