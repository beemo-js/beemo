import {aopAnnotation} from '../../annotations'
import {container, CacheServiceName} from '../../../framework'
import {Cache} from '..'

/**
 * Cache the result of method call under the key returned by cacheKey.
 */
export function Cached(cacheKey: (args) => string): MethodDecorator {
    return aopAnnotation((next, args) => {
        return container.get<Cache>(CacheServiceName.Cache).withCache(cacheKey(args), () => next(args))
    })
}