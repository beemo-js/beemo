import Reflect from 'reflect-metadata';
// Target can come only from an annotation
export class ReflectionClassTypesStore {
    constructor(classTypesStore) {
        this.classTypesStore = classTypesStore;
    }
    // Constructor parameters
    getConstructorParametersTypes(classFn) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', classFn) || [];
        paramTypes.forEach((type, index) => { this.setConstructorParameterType(classFn, index, type, false); });
        return this.classTypesStore.getConstructorParametersTypes(classFn);
    }
    getConstructorParameterType(classFn, paramIndex) {
        const foundType = this.classTypesStore.getConstructorParameterType(classFn, paramIndex);
        return foundType || this.getConstructorParametersTypes(classFn)[paramIndex];
    }
    setConstructorParameterType(classFn, paramIndex, type, replaceIfExists = true) {
        this.classTypesStore.setConstructorParameterType(classFn, paramIndex, type, replaceIfExists);
    }
    // Property type
    getPropertyType(target, property) {
        let reflectedType = Reflect.getMetadata('design:type', target, property) || Object;
        this.classTypesStore.setPropertyType(target.constructor, property, reflectedType, false);
        return this.classTypesStore.getPropertyType(target.constructor, property);
    }
    setPropertyType(target, property, type, replaceIfExists = true) {
        this.classTypesStore.setPropertyType(target.constructor, property, type, replaceIfExists);
    }
    // Method return type
    getMethodType(target, method) {
        let reflectedType = Reflect.getMetadata('design:returntype', target, method) || Object;
        this.classTypesStore.setMethodReturnType(target.constructor, method, reflectedType, false);
        return this.classTypesStore.getMethodReturnType(target.constructor, method);
    }
    setMethodType(target, method, type, replaceIfExists = true) {
        this.classTypesStore.setMethodReturnType(target.constructor, method, type, replaceIfExists);
    }
    // Method parameters types
    getMethodParametersTypes(target, method) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method) || [];
        paramTypes.forEach((type, index) => { this.setMethodParameterType(target.constructor, method, index, type, false); });
        return this.classTypesStore.getMethodParametersTypes(target.constructor, method);
    }
    getMethodParameterType(target, method, paramIndex) {
        const foundType = this.classTypesStore.getMethodParameterType(target.constructor, method, paramIndex);
        return foundType || this.getMethodParametersTypes(target, method)[paramIndex];
    }
    setMethodParameterType(target, method, paramIndex, type, replaceIfExists = true) {
        this.classTypesStore.setMethodParameterType(target.constructor, method, paramIndex, type, replaceIfExists);
    }
}
