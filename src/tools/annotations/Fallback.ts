import {aopAnnotation} from '../../annotations/aop'

export function Fallback(fn: Function): MethodDecorator {
    return aopAnnotation((next, args) => {
        try {
            return next(args)
        } catch (e) {
            return fn(args)
        }
    })
}