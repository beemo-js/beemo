import {aopAnnotation} from '../../annotations/aop'
import {container} from '../../framework/globalContainer'
import {Cache} from '../Cache'
import {CacheServiceName} from '../../framework/services'

export function Cached(cacheKey: (args) => string): MethodDecorator {
    return aopAnnotation((next, args) => {
        return container.get<Cache>(CacheServiceName.Cache).withCache(cacheKey(args), () => next(args))
    })
}