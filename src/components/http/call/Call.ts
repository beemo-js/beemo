import {Request} from '..'

/**
 * Represents a resource that can be accessed via an HTTP request.
 */
export class Call<T> {
    /**
     * The resource value.
     */
    value?: T

    /**
     * The HTTP request to call to retrieve the resource.
     */
    request?: Request

    /**
     * Formats the HTTP response's body to get the data to denormalize.
     * By default, returns the entire data.
     */
    responseFormatter: (responseBody: Object) => Object = responseBody => responseBody

    /**
     * Has the value been retrieved?
     */
    retrieved: boolean = false

    constructor(
        /**
         * The class representing the resource.
         */
        public classFn: Function = Object,
    ) {
        this.retrieved = false
    }

    static merge<T>(...calls: Call<T>[]): Call<T> {
        const result = new Call<T>()
        return calls.reduce((base, call) => {
            if (!call) return base

            base.value = call.value || base.value
            base.request = Request.merge(base.request, call.request)
            base.retrieved = call.retrieved || base.retrieved
            base.classFn = call.classFn == Object ? call.classFn: base.classFn
            return base
        }, result)
    }

    static clone<T>(call: Call<T>): Call<T> {
        const result = new Call<T>()
        result.classFn = call.classFn
        result.value = call.value
        result.request = call.request
        result.responseFormatter = call.responseFormatter
        result.retrieved = call.retrieved
        return result
    }

    /**
     * Construct a call from given request.
     */
    static fromRequest<T>(request: Request, classFn: Function = Object, responseFormatter: (responseBody: Object) => Object = responseBody => responseBody): Call<T> {
        const liveData = new Call<T>(classFn)
        liveData.request = request
        liveData.responseFormatter = responseFormatter
        liveData.retrieved = false
        return liveData
    }

    /**
     * Construct a call directly from resource value.
     */
    static fromValue<T>(value: T, classFn: Function = Object): Call<T> {
        const liveData = new Call<T>(classFn)
        liveData.value = value
        liveData.retrieved = true
        return liveData
    }

    /**
     * Get the resource value, if available.
     */
    get(): T {
        if (!this.retrieved) {
            throw 'Value not yet retrieved'
        }
        return this.value
    }

    /**
     * Set the resource value.
     */
    set(value: T): void {
        this.value = value
        this.retrieved = true
        this.request = null
    }
}