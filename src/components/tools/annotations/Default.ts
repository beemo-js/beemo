import {aopAnnotation} from '../../annotations/aop'

export function Default(fn: Function): MethodDecorator {
    return aopAnnotation((next, args) => {
        const result = next(args)
        if (result === undefined || result === null) {
            return fn(args)
        }
        return result
    })
}