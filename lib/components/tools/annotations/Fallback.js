import { aopAnnotation } from '../../annotations/aop';
/**
 * If called method throws an exception, return fallback instead.
 */
export function Fallback(fn) {
    return aopAnnotation((next, args) => {
        try {
            return next(args);
        }
        catch (e) {
            return fn(args);
        }
    });
}
