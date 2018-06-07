import {Call} from '../../call/Call'
import {Request} from '../../abstractions/Request'
import {RequestParamsType} from '../../types'

export abstract class CallFactory<T> {
    constructor(
        protected classFn: Function,
        protected baseRequest: Request
    ) {}

    protected buildRequestCall(request: Request, classFn: Function = this.classFn): Call<T> {
        return Call.fromRequest(classFn, Request.merge(this.baseRequest, request))
    }

    protected get(url: string = '', requestOptions: RequestParamsType = {}, classFn: Function = this.classFn): Call<T> {
        return this.buildRequestCall(new Request(url, { method: 'GET', ...requestOptions }), classFn)
    }

    protected post(url: string = '', requestOptions: RequestParamsType = {}, classFn: Function = this.classFn): Call<T> {
        return this.buildRequestCall(new Request(url, { method: 'POST', ...requestOptions }), classFn)
    }

    protected put(url: string = '', requestOptions: RequestParamsType = {}, classFn: Function = this.classFn): Call<T> {
        return this.buildRequestCall(new Request(url, { method: 'PUT', ...requestOptions }), classFn)
    }

    protected delete(url: string = '', requestOptions: RequestParamsType = {}, classFn: Function = this.classFn): Call<T> {
        return this.buildRequestCall(new Request(url, { method: 'DELETE', ...requestOptions }), classFn)
    }
}
