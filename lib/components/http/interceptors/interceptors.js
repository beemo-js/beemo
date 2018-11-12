var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { container } from '../../../framework/globalContainer';
import { HttpServiceName } from '../../../framework/services';
/**
 * Retry calling the request nbRetries times if it failed.
 */
export function retryInterceptor(nbRetries = 1) {
    return (next, request) => __awaiter(this, void 0, void 0, function* () {
        let exception;
        for (let i = 0; i <= nbRetries; i++) {
            try {
                return yield next(request);
            }
            catch (e) {
                exception = e;
            }
        }
        throw exception;
    });
}
/**
 * Set a timeout for HTTP request.
 */
export function timeoutInterceptor(timeout = 5000) {
    return (next, request) => __awaiter(this, void 0, void 0, function* () {
        const requestPromise = next(request);
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, timeout, false));
        const response = yield Promise.race([requestPromise, timeoutPromise]);
        if (response === false) {
            throw 'Timeout - response could not be received in time';
        }
        return response;
    });
}
/**
 * Apply the circuit breaker pattern when making an HTTP request.
 */
export function circuitBreakerInterceptor() {
    return (next, request) => {
        const circuitBreaker = container.get(HttpServiceName.CircuitBreaker);
        return circuitBreaker.attempt(() => next(request));
    };
}
