/**
 * Store of metadata for classes.
 */
export declare class ClassMetadataStore {
    private metadata;
    getClassData(classFn: Function): Object;
    getConstructorData(classFn: Function): Object[];
    getConstructorParametersData(classFn: Function): Object[];
    getConstructorParameterData(classFn: Function, index: number): Object;
    getPropertiesData(classFn: Function): Object;
    getPropertyData(classFn: Function, propertyName: string): Object;
    getMethodsData(classFn: Function): Object;
    getMethodData(classFn: Function, methodName: string): Object;
    getMethodParametersData(classFn: Function, methodName: string): Object[];
    getMethodParameterData(classFn: Function, methodName: string, index: number): Object;
    withDefault(obj: Object, key: string | number, defaultValue: any): any;
    private classData(classFn);
}
