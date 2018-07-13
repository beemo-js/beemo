import 'reflect-metadata'
import {ClassMetadataStore} from '../metadata'

export class ClassTypesStore {

    constructor(
        private classMetadataStore: ClassMetadataStore
    ) {}

    // Constructor parameters

    getConstructorParametersTypes(classFn: Function): Function[] {
        const parametersData = this.classMetadataStore.getConstructorParametersData(classFn)
        const types = []
        for (let paramIndex in parametersData) {
            types.push(this.getConstructorParameterType(classFn, parseInt(paramIndex, 10)))
        }
        return types
    }

    getConstructorParameterType(classFn: Function, paramIndex: number): Function {
        return this.getObjectType(this.classMetadataStore.getConstructorParameterData(classFn, paramIndex))
    }

    setConstructorParameterType(classFn: Function, paramIndex: number, type: Function, replaceIfExists: boolean = true): void {
        const base = this.classMetadataStore.getConstructorParameterData(classFn, paramIndex)
        this.setObjectType(base, type, replaceIfExists)
    }

    // Property type

    getPropertyType(classFn: Function, property: string): Function {
        return this.getObjectType(this.classMetadataStore.getPropertyData(classFn, property))
    }

    setPropertyType(classFn: Function, property: string, type: Function, replaceIfExists: boolean = true): void {
        const base = this.classMetadataStore.getPropertyData(classFn, property)
        this.setObjectType(base, type, replaceIfExists)
    }

    // Method return type

    getMethodReturnType(classFn: Function, method: string): Function {
        return this.getObjectType(this.classMetadataStore.getMethodData(classFn, method))
    }

    setMethodReturnType(classFn: Function, method: string, type: Function, replaceIfExists: boolean = true): void {
        const base = this.classMetadataStore.getMethodData(classFn, method)
        this.setObjectType(base, type, replaceIfExists)
    }

    // Method parameters types

    getMethodParametersTypes(classFn: Function, method: string): Function[] {
        const parametersData = this.classMetadataStore.getMethodParametersData(classFn, method)
        const types = []
        for (let paramIndex in parametersData) {
            types.push(this.getMethodParameterType(classFn, method, parseInt(paramIndex, 10)))
        }
        return types
    }

    getMethodParameterType(classFn: Function, method: string, paramIndex: number): Function {
        return this.getObjectType(this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex))
    }

    setMethodParameterType(classFn: Function, method: string, paramIndex: number, type: Function, replaceIfExists: boolean = true): void {
        const base = this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex)
        this.setObjectType(base, type, replaceIfExists)
    }

    // Helpers

    private getObjectType(obj: Object): Function {
        return this.classMetadataStore.withDefault(obj, 'type', undefined)
    }

    private setObjectType(obj: Object, type: Function, replaceIfExists: boolean): void {
        if (replaceIfExists || !obj['type']) {
            obj['type'] = type
        }
    }

}
