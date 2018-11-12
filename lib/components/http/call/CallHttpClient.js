var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Call } from './Call';
/**
 * Retrieves the value of Call resources.
 */
export class CallHttpClient {
    constructor(httpClient, encoder, normalizer) {
        this.httpClient = httpClient;
        this.encoder = encoder;
        this.normalizer = normalizer;
    }
    retrieveData(call) {
        return (call instanceof Call ? this.retrieveCallData(call) :
            Array.isArray(call) ? this.retrieveDataArray(call) :
                this.retrieveDataObject(call));
    }
    /**
     * Retrieve value of one Call.
     */
    retrieveCallData(call) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!call.retrieved) {
                const response = yield this.httpClient.sendRequest(call.request);
                this.parseCallResponseData(call, response);
            }
            return call.get();
        });
    }
    /**
     * Retrieve value of a list of Calls.
     */
    retrieveDataArray(calls) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestsToSend = calls
                .map((rd, index) => [rd, index])
                .filter(([rd]) => !rd.retrieved);
            const responses = yield this.httpClient.sendRequests(requestsToSend.map(([rd]) => rd.request));
            responses.forEach((resp, index) => __awaiter(this, void 0, void 0, function* () {
                const id = requestsToSend[index][1];
                this.parseCallResponseData(calls[id], resp);
            }));
            return calls.map(rd => rd.value);
        });
    }
    /**
     * Retrieve value of Calls in a dict of calls.
     */
    retrieveDataObject(requestsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = Object.assign({}, requestsData);
            yield this.retrieveDataArray(Object.values(result));
            for (let i in result) {
                result[i] = result[i].value;
            }
            return result;
        });
    }
    /**
     * Set the value of given Call from HTTP response.
     */
    parseCallResponseData(call, response) {
        const rawResponseData = this.encoder.decode(response.body.content);
        const formattedResponseData = call.responseFormatter(rawResponseData);
        const normalizedResponseData = this.normalizer.denormalize(call.classFn, formattedResponseData);
        call.set(normalizedResponseData);
    }
}
