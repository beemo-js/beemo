import { Request } from '../abstractions/Request';
/**
 * Represents a resource that can be accessed via an HTTP request.
 */
export declare class Call<T> {
    /**
     * The class representing the resource.
     */
    classFn: Function;
    /**
     * The resource value.
     */
    value?: T;
    /**
     * The HTTP request to call to retrieve the resource.
     */
    request?: Request;
    /**
     * Formats the HTTP response's body to get the data to denormalize.
     * By default, returns the entire data.
     */
    responseFormatter: (responseBody: Object) => Object;
    /**
     * Has the value been retrieved?
     */
    retrieved: boolean;
    constructor(
        /**
         * The class representing the resource.
         */
        classFn?: Function);
    static merge<T>(...calls: Call<T>[]): Call<T>;
    static clone<T>(call: Call<T>): Call<T>;
    /**
     * Construct a call from given request.
     */
    static fromRequest<T>(request: Request, classFn?: Function, responseFormatter?: (responseBody: Object) => Object): Call<T>;
    /**
     * Construct a call directly from resource value.
     */
    static fromValue<T>(value: T, classFn?: Function): Call<T>;
    /**
     * Get the resource value, if available.
     */
    get(): T;
    /**
     * Set the resource value.
     */
    set(value: T): void;
}
