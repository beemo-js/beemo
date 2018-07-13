import {ClassAnnotationsStore} from '../../../annotations'
import {Call, Body, Header, UrlParam, RequestBody} from '../..'
import {Normalizer} from '../../../serialization'

/**
 * Fills the call returned from method in call factory with data in parameters.
 */
export class CallAnnotationsHandler {
    constructor(
        private classAnnotationsStore: ClassAnnotationsStore,
        private normalizer: Normalizer
    ) {}

    /**
     * Fills the call returned from method with data in parameters.
     */
    handle<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.setBody(call, classFn, method, args)
        this.setUrlParams(call, classFn, method, args)
        this.setHeaders(call, classFn, method, args)
    }

    private setBody<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void {
        this.fillFromAnnotations(call, classFn, method, args, Body, (call, arg, body) => {
            call.request.body = RequestBody.fromData(this.normalizer.normalize(body['data']['classFn'], arg))
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