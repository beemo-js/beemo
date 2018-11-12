var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Sends queued requests when network is available in parallel.
 */
export class BatchRequestsQueue {
    constructor(httpClient, syncServiceWorkerEnabled) {
        this.httpClient = httpClient;
        this.syncServiceWorkerEnabled = syncServiceWorkerEnabled;
        this.requests = [];
    }
    queueRequest(request) {
        this.requests.push(request);
    }
    queueAndSend(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queueRequest(request);
            return this.sendRequests();
        });
    }
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.httpClient.sendRequest(request);
                return true;
            }
            catch (e) {
                // If sync service worker is enabled, let it sync in background
                if (!this.syncServiceWorkerEnabled) {
                    this.requests.push(request);
                }
                return false;
            }
        });
    }
    sendRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestsToSend = this.requests.splice(0);
            try {
                yield this.httpClient.sendRequests(requestsToSend);
                return true;
            }
            catch (e) {
                // If sync service worker is enabled, let it sync in background
                if (!this.syncServiceWorkerEnabled) {
                    this.requests = this.requests.concat(requestsToSend);
                }
                return false;
            }
        });
    }
}
