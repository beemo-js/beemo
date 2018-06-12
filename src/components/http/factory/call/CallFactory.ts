import {Call} from '../../call/Call'
import {Request} from '../../abstractions/Request'
import {RequestParamsType} from '../../types'

type callOptions = {
    classFn?: Function,
    responseBodyFormatter?: (body: Object) => Object
}

export abstract class CallFactory {
    constructor(
        protected classFn: Function,
        protected baseRequest: Request,
        protected responseBodyFormatter: (body: Object) => Object = body => body
    ) {}

    protected buildRequestCall<T>(
        request: Request,
        {classFn = this.classFn, responseBodyFormatter = this.responseBodyFormatter}: callOptions = {}
    ): Call<T> {
        const call = Call.fromRequest<T>(classFn, Request.merge(this.baseRequest, request))
        call.responseFormatter = this.responseBodyFormatter
        return call
    }

    protected get<T>(
        url: string = '',
        requestOptions: RequestParamsType = {},
        {classFn = this.classFn, responseBodyFormatter = this.responseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, { method: 'GET', ...requestOptions }), {classFn, responseBodyFormatter})
    }

    protected post<T>(
        url: string = '',
        requestOptions: RequestParamsType = {},
        {classFn = this.classFn, responseBodyFormatter = this.responseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, { method: 'POST', ...requestOptions }), {classFn, responseBodyFormatter})
    }

    protected put<T>(
        url: string = '',
        requestOptions: RequestParamsType = {},
        {classFn = this.classFn, responseBodyFormatter = this.responseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, { method: 'PUT', ...requestOptions }), {classFn, responseBodyFormatter})
    }

    protected delete<T>(
        url: string = '',
        requestOptions: RequestParamsType = {},
        {classFn = this.classFn, responseBodyFormatter = this.responseBodyFormatter}: callOptions = {}
    ): Call<T> {
        return this.buildRequestCall<T>(new Request(url, { method: 'DELETE', ...requestOptions }), {classFn, responseBodyFormatter})
    }
}
