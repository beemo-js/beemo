import { ClassAnnotationsStore } from '../../../annotations/ClassAnnotationsStore';
import { Normalizer } from '../../../serialization/Normalizer';
import { Call } from '../../call/Call';
/**
 * Fills the call returned from method in call factory with data in parameters.
 */
export declare class CallAnnotationsHandler {
    private classAnnotationsStore;
    private normalizer;
    constructor(classAnnotationsStore: ClassAnnotationsStore, normalizer: Normalizer);
    /**
     * Fills the call returned from method with data in parameters.
     */
    handle<T>(call: Call<T>, classFn: Function, method: string, args: any[]): void;
    private setBody<T>(call, classFn, method, args);
    private setUrlParams<T>(call, classFn, method, args);
    private setHeaders<T>(call, classFn, method, args);
    private fillFromAnnotations<T>(call, classFn, method, args, annotation, filler);
}
