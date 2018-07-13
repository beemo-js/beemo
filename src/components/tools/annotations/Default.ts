import {aopAnnotation} from '../../annotations'

/**
 * If returned value is null, return default one instead.
 */
export function Default(fn: (args: any[]) => any): MethodDecorator {
    return aopAnnotation((next, args) => {
        const result = next(args)
        if (result === undefined || result === null) {
            return fn(args)
        }
        return result
    })
}