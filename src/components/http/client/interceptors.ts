import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

export type Interceptor = (next: (req: Request) => Promise<Response>, request: Request) => Promise<Response>

/**
 * Retry calling the request nbRetries times if it failed.
 */
export function retryInterceptor(nbRetries: number = 1): Interceptor {
    return async (next: (req: Request) => Promise<Response>, request: Request) => {
        let exception
        for (let i = 0; i <= nbRetries; i++) {
            try {
                return await next(request)
            } catch (e) {
                exception = e
            }
        }
        throw exception
    }
}

/**
 * Set a timeout for HTTP request.
 */
export function timeoutInterceptor(timeout: number = 5000): Interceptor {
    return async (next: (req: Request) => Promise<Response>, request: Request) => {
        const requestPromise = next(request)
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, timeout, false))

        const response = await Promise.race([requestPromise, timeoutPromise])
        if (response === false) {
            throw 'Timeout - response could not be received in time'
        }

        return response as Response
    }
}
