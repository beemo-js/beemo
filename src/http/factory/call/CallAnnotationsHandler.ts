import {Serializer} from '../../../serialization/serializers/Serializer'
import {ClassAnnotationsStore} from '../../../annotations/ClassAnnotationsStore'
import {Call} from '../../call/Call'
import {Body, Header, UrlParam} from '../../annotations/call_factory'

export class CallAnnotationsHandler {
    constructor(
        private classAnnotationsStore: ClassAnnotationsStore,
        private serializer: Serializer
    ) {}

    handle<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.setBody(call, classFn, method, args)
        this.setUrlParams(call, classFn, method, args)
        this.setHeaders(call, classFn, method, args)
    }

    private setBody<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.fillFromAnnotations(call, classFn, method, args, Body, (call, arg, body) => {
            call.request.body = this.serializer.serialize(body['data']['classFn'], arg)
        })
    }

    private setUrlParams<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.fillFromAnnotations(call, classFn, method, args, UrlParam, (call, arg, urlParam) => {
            call.request.urlParameters[urlParam['data']['name']] = arg.toString()
        })
    }

    private setHeaders<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.fillFromAnnotations(call, classFn, method, args, Header, (call, arg, header) => {
            call.request.headers[header['data']['name']] = arg.toString()
        })
    }

    private fillFromAnnotations<T>(
        call: Call<T>,
        classFn: Function,
        method: string,
        args: any[],
        annotation: Function,
        filler: (call: Call<T>, arg: any, annotationData: Object) => void
    ): void {
        args
            .map((arg, index) => ([
                arg,
                this.classAnnotationsStore.getMethodParameterAnnotations(classFn, method, index, annotation)
            ]))
            .filter(([arg, annotation]) => annotation.length > 0)
            .map(([arg, annotation]) => [arg, annotation[0]])
            .forEach(([arg, annotation]) => filler(call, arg, annotation))
    }
}