var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class HttpClient {
    constructor(requestSender) {
        this.requestSender = requestSender;
        /**
         * Request interceptors / middleware.
         */
        this.interceptors = [];
    }
    sendRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const interceptors = this.interceptors.slice();
            interceptors.push((next, request) => this.requestSender.sendRequest(request));
            let ii = 0;
            const nextFns = interceptors.map(() => (i => req => interceptors[i](nextFns[i], req))(++ii));
            return interceptors[0](nextFns[0], request);
        });
    }
    sendRequests(requests) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(requests.map(request => this.sendRequest(request)));
        });
    }
    useInterceptor(interceptor) {
        this.interceptors.push(interceptor);
    }
}
