export declare type middlewareType = (next: (args: any[]) => any, args: any[]) => any;
export interface AnnotationData {
    type: Function;
    data: Object;
}
