import 'reflect-metadata';
import { ClassTypesStore } from './ClassTypesStore';
export declare class ReflectionClassTypesStore {
    private classTypesStore;
    constructor(classTypesStore: ClassTypesStore);
    getConstructorParametersTypes(classFn: Function): Function[];
    getConstructorParameterType(classFn: Function, paramIndex: number): Function;
    setConstructorParameterType(classFn: Function, paramIndex: number, type: Function, replaceIfExists?: boolean): void;
    getPropertyType(target: any, property: string): Function;
    setPropertyType(target: any, property: string, type: Function, replaceIfExists?: boolean): void;
    getMethodType(target: any, method: string): Function;
    setMethodType(target: any, method: string, type: Function, replaceIfExists?: boolean): void;
    getMethodParametersTypes(target: any, method: string): Function[];
    getMethodParameterType(target: any, method: string, paramIndex: number): Function;
    setMethodParameterType(target: any, method: string, paramIndex: number, type: Function, replaceIfExists?: boolean): void;
}
