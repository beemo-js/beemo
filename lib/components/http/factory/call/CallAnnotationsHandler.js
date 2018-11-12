import { Body, Header, UrlParam } from '../../annotations/call_factory';
import { RequestBody } from '../../abstractions/RequestBody';
/**
 * Fills the call returned from method in call factory with data in parameters.
 */
export class CallAnnotationsHandler {
    constructor(classAnnotationsStore, normalizer) {
        this.classAnnotationsStore = classAnnotationsStore;
        this.normalizer = normalizer;
    }
    /**
     * Fills the call returned from method with data in parameters.
     */
    handle(call, classFn, method, args) {
        this.setBody(call, classFn, method, args);
        this.setUrlParams(call, classFn, method, args);
        this.setHeaders(call, classFn, method, args);
    }
    setBody(call, classFn, method, args) {
        this.fillFromAnnotations(call, classFn, method, args, Body, (call, arg, body) => {
            call.request.body = RequestBody.fromData(this.normalizer.normalize(body['data']['classFn'], arg));
        });
    }
    setUrlParams(call, classFn, method, args) {
        this.fillFromAnnotations(call, classFn, method, args, UrlParam, (call, arg, urlParam) => {
            call.request.urlParameters[urlParam['data']['name']] = arg.toString();
        });
    }
    setHeaders(call, classFn, method, args) {
        this.fillFromAnnotations(call, classFn, method, args, Header, (call, arg, header) => {
            call.request.headers[header['data']['name']] = arg.toString();
        });
    }
    fillFromAnnotations(call, classFn, method, args, annotation, filler) {
        args
            .map((arg, index) => ([
            arg,
            this.classAnnotationsStore.getMethodParameterAnnotations(classFn, method, index, annotation)
        ]))
            .filter(([arg, annotation]) => annotation.length > 0)
            .map(([arg, annotation]) => [arg, annotation[0]])
            .forEach(([arg, annotation]) => filler(call, arg, annotation));
    }
}
