import { Request } from '../../abstractions/Request';
import { Call } from '../../call/Call';
/**
 * Builds Call instances.
 */
export class CallFactory {
    constructor(baseCall = new Call()) {
        this.baseCall = baseCall;
    }
    buildRequestCall(url, method) {
        const call = Call.clone(this.baseCall);
        call.request = Request.merge(this.baseCall.request, new Request(url, method));
        return call;
    }
    get(url = '') {
        return this.buildRequestCall(url, 'GET');
    }
    post(url = '') {
        return this.buildRequestCall(url, 'POST');
    }
    put(url = '') {
        return this.buildRequestCall(url, 'PUT');
    }
    patch(url = '') {
        return this.buildRequestCall(url, 'PATCH');
    }
    delete(url = '') {
        return this.buildRequestCall(url, 'DELETE');
    }
}
