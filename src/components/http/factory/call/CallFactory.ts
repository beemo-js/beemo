import {Call} from '../../call/Call'
import {Request} from '../../abstractions/Request'

type callOptions = {
    classFn?: Function,
    responseBodyFormatter?: (body: Object) => Object
}

/**
 * Builds Call instances.
 */
export abstract class CallFactory {
    constructor(
        protected classFn: Function,
        protected baseRequest: Request,
        protected baseResponseBodyFormatter: (body: Object) => Object = body => body
    ) {}

    protected buildRequestCall<T>(
        request: Request,
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        const call = Call.fromRequest<T>(classFn, Request.merge(this.baseRequest, request))
        call.responseFormatter = responseBodyFormatter
        return call
    }

    protected get<T>(
        url: string = '',
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, 'GET'), {classFn, responseBodyFormatter})
    }

    protected post<T>(
        url: string = '',
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, 'POST'), {classFn, responseBodyFormatter})
    }

    protected put<T>(
        url: string = '',
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, 'PUT'), {classFn, responseBodyFormatter})
    }

    protected patch<T>(
        url: string = '',
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, 'PATCH'), {classFn, responseBodyFormatter})
    }

    protected delete<T>(
        url: string = '',
        {classFn = this.classFn, responseBodyFormatter = this.baseResponseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, 'DELETE'), {classFn, responseBodyFormatter})
    }
}
