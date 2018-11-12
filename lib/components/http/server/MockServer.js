var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ResponseBuilder } from '../abstractions/ResponseBuilder';
/**
 * Simple embedded mock server. Requests sent by MockHttpRequestSender are handled by provided controllers.
 */
export class MockServer {
    constructor(
    /** Routes to handle requests */
    routes, 
    /** time to wait before receiving a response */
    latency = 300) {
        this.routes = routes;
        this.latency = latency;
    }
    /**
     * Handle given request.
     */
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = this.findRoute(request.getFinalUrl());
            if (!resource) {
                return new ResponseBuilder().status(404).body(JSON.stringify({ message: 'Not Found' })).build();
            }
            // sleep
            yield new Promise(resolve => setTimeout(resolve, this.latency));
            return resource.controller(request);
        });
    }
    /**
     * Find route from given url by pattern matching.
     */
    findRoute(url) {
        return this.routes.find(({ pattern }) => new RegExp(pattern).test(url));
    }
}
