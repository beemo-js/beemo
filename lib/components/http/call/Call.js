import { Request } from '../abstractions/Request';
/**
 * Represents a resource that can be accessed via an HTTP request.
 */
export class Call {
    constructor(
    /**
     * The class representing the resource.
     */
    classFn = Object) {
        this.classFn = classFn;
        /**
         * Formats the HTTP response's body to get the data to denormalize.
         * By default, returns the entire data.
         */
        this.responseFormatter = responseBody => responseBody;
        /**
         * Has the value been retrieved?
         */
        this.retrieved = false;
        this.retrieved = false;
    }
    static merge(...calls) {
        return calls.reduce((base, call) => {
            if (!call)
                return base;
            base.value = call.value || base.value;
            base.request = Request.merge(base.request, call.request);
            base.retrieved = call.retrieved || base.retrieved;
            base.classFn = call.classFn == Object ? call.classFn : base.classFn;
            return base;
        }, new Call());
    }
    static clone(call) {
        const result = new Call();
        result.classFn = call.classFn;
        result.value = call.value;
        result.request = call.request;
        result.responseFormatter = call.responseFormatter;
        result.retrieved = call.retrieved;
        return result;
    }
    /**
     * Construct a call from given request.
     */
    static fromRequest(request, classFn = Object, responseFormatter = responseBody => responseBody) {
        const liveData = new Call(classFn);
        liveData.request = request;
        liveData.responseFormatter = responseFormatter;
        liveData.retrieved = false;
        return liveData;
    }
    /**
     * Construct a call directly from resource value.
     */
    static fromValue(value, classFn = Object) {
        const liveData = new Call(classFn);
        liveData.value = value;
        liveData.retrieved = true;
        return liveData;
    }
    /**
     * Get the resource value, if available.
     */
    get() {
        if (!this.retrieved) {
            throw 'Value not yet retrieved';
        }
        return this.value;
    }
    /**
     * Set the resource value.
     */
    set(value) {
        this.value = value;
        this.retrieved = true;
    }
}
