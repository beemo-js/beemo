import 'reflect-metadata';
import { ClassMetadataStore } from '../metadata/ClassMetadataStore';
export declare class ClassTypesStore {
    private classMetadataStore;
    constructor(classMetadataStore: ClassMetadataStore);
    getConstructorParametersTypes(classFn: Function): Function[];
    getConstructorParameterType(classFn: Function, paramIndex: number): Function;
    setConstructorParameterType(classFn: Function, paramIndex: number, type: Function, replaceIfExists?: boolean): void;
    getPropertyType(classFn: Function, property: string): Function;
    setPropertyType(classFn: Function, property: string, type: Function, replaceIfExists?: boolean): void;
    getMethodReturnType(classFn: Function, method: string): Function;
    setMethodReturnType(classFn: Function, method: string, type: Function, replaceIfExists?: boolean): void;
    getMethodParametersTypes(classFn: Function, method: string): Function[];
    getMethodParameterType(classFn: Function, method: string, paramIndex: number): Function;
    setMethodParameterType(classFn: Function, method: string, paramIndex: number, type: Function, replaceIfExists?: boolean): void;
    private getObjectType(obj);
    private setObjectType(obj, type, replaceIfExists);
}
