import {Request} from '../abstractions/Request'

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
     * Has the value been retrieved?
     */
    retrieved: boolean

    constructor(
        /**
         * The class representing the resource.
         */
        public classFn: Function,

        /**
         * Formats the HTTP response's body to get the data to denormalize.
         * By default, returns the entire data.
         */
        public responseFormatter: (responseBody: Object) => Object = responseBody => responseBody
    ) {
        this.retrieved = false
    }

    /**
     * Construct a call from given request.
     */
    static fromRequest<T>(classFn: Function, request: Request): Call<T> {
        const liveData = new Call<T>(classFn)
        liveData.request = request
        liveData.retrieved = false
        return liveData
    }

    /**
     * Construct a call directly from resource value.
     */
    static fromValue<T>(classFn: Function, value: T): Call<T> {
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