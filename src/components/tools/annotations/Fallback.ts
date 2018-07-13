import {aopAnnotation} from '../../annotations'

/**
 * If called method throws an exception, return fallback instead.
 */
export function Fallback(fn: Function): MethodDecorator {
    return aopAnnotation((next, args) => {
        try {
            return next(args)
        } catch (e) {
            return fn(args)
        }
    })
}