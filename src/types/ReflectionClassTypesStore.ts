import 'reflect-metadata'
import {ClassTypesStore} from './ClassTypesStore'

// Target can come only from an annotation

export class ReflectionClassTypesStore {
    constructor(
        private classTypesStore: ClassTypesStore
    ) {}

    // Constructor parameters

    getConstructorParametersTypes(classFn: Function): Function[] {
        const paramTypes = Reflect.getMetadata('design:paramtypes', classFn) || []
        paramTypes.forEach((type, index) => { this.setConstructorParameterType(classFn, index, type, false) })
        return this.classTypesStore.getConstructorParametersTypes(classFn)
    }

    getConstructorParameterType(classFn: Function, paramIndex: number): Function {
        const foundType = this.classTypesStore.getConstructorParameterType(classFn, paramIndex)
        return foundType || this.getConstructorParametersTypes(classFn)[paramIndex]
    }

    setConstructorParameterType(classFn: Function, paramIndex: number, type: Function, replaceIfExists: boolean = true): void {
        this.classTypesStore.setConstructorParameterType(classFn, paramIndex, type, replaceIfExists)
    }

    // Property type

    getPropertyType(target: any, property: string): Function {
        let reflectedType = Reflect.getMetadata('design:type', target, property) || Object
        this.classTypesStore.setPropertyType(target.constructor, property, reflectedType, false)
        return this.classTypesStore.getPropertyType(target.constructor, property)
    }

    setPropertyType(target: any, property: string, type: Function, replaceIfExists: boolean = true): void {
        this.classTypesStore.setPropertyType(target.constructor, property, type, replaceIfExists)
    }

    // Method return type

    getMethodType(target: any, method: string): Function {
        let reflectedType = Reflect.getMetadata('design:returntype', target, method) || Object
        this.classTypesStore.setMethodReturnType(target.constructor, method, reflectedType, false)
        return this.classTypesStore.getMethodReturnType(target.constructor, method)
    }

    setMethodType(target: any, method: string, type: Function, replaceIfExists: boolean = true): void {
        this.classTypesStore.setMethodReturnType(target.constructor, method, type, replaceIfExists)
    }

    // Method parameters types

    getMethodParametersTypes(target: any, method: string): Function[] {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method) || []
        paramTypes.forEach((type, index) => { this.setMethodParameterType(target.constructor, method, index, type, false) })
        return this.classTypesStore.getMethodParametersTypes(target.constructor, method)
    }

    getMethodParameterType(target: any, method: string, paramIndex: number): Function {
        const foundType = this.classTypesStore.getMethodParameterType(target.constructor, method, paramIndex)
        return foundType || this.getMethodParametersTypes(target, method)[paramIndex]
    }

    setMethodParameterType(target: any, method: string, paramIndex: number, type: Function, replaceIfExists: boolean = true): void {
        this.classTypesStore.setMethodParameterType(target.constructor, method, paramIndex, type, replaceIfExists)
    }
}
