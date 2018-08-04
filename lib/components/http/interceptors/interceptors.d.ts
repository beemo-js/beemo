import { Request, Response } from '..';
export declare type Interceptor = (next: (req: Request) => Promise<Response>, request: Request) => Promise<Response>;
/**
 * Retry calling the request nbRetries times if it failed.
 */
export declare function retryInterceptor(nbRetries?: number): Interceptor;
/**
 * Set a timeout for HTTP request.
 */
export declare function timeoutInterceptor(timeout?: number): Interceptor;
/**
 * Apply the circuit breaker pattern when making an HTTP request.
 */
export declare function circuitBreakerInterceptor(): Interceptor;
