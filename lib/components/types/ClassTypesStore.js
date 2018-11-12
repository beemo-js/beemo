import 'reflect-metadata';
export class ClassTypesStore {
    constructor(classMetadataStore) {
        this.classMetadataStore = classMetadataStore;
    }
    // Constructor parameters
    getConstructorParametersTypes(classFn) {
        const parametersData = this.classMetadataStore.getConstructorParametersData(classFn);
        const types = [];
        for (let paramIndex in parametersData) {
            types.push(this.getConstructorParameterType(classFn, parseInt(paramIndex, 10)));
        }
        return types;
    }
    getConstructorParameterType(classFn, paramIndex) {
        return this.getObjectType(this.classMetadataStore.getConstructorParameterData(classFn, paramIndex));
    }
    setConstructorParameterType(classFn, paramIndex, type, replaceIfExists = true) {
        const base = this.classMetadataStore.getConstructorParameterData(classFn, paramIndex);
        this.setObjectType(base, type, replaceIfExists);
    }
    // Property type
    getPropertyType(classFn, property) {
        return this.getObjectType(this.classMetadataStore.getPropertyData(classFn, property));
    }
    setPropertyType(classFn, property, type, replaceIfExists = true) {
        const base = this.classMetadataStore.getPropertyData(classFn, property);
        this.setObjectType(base, type, replaceIfExists);
    }
    // Method return type
    getMethodReturnType(classFn, method) {
        return this.getObjectType(this.classMetadataStore.getMethodData(classFn, method));
    }
    setMethodReturnType(classFn, method, type, replaceIfExists = true) {
        const base = this.classMetadataStore.getMethodData(classFn, method);
        this.setObjectType(base, type, replaceIfExists);
    }
    // Method parameters types
    getMethodParametersTypes(classFn, method) {
        const parametersData = this.classMetadataStore.getMethodParametersData(classFn, method);
        const types = [];
        for (let paramIndex in parametersData) {
            types.push(this.getMethodParameterType(classFn, method, parseInt(paramIndex, 10)));
        }
        return types;
    }
    getMethodParameterType(classFn, method, paramIndex) {
        return this.getObjectType(this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex));
    }
    setMethodParameterType(classFn, method, paramIndex, type, replaceIfExists = true) {
        const base = this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex);
        this.setObjectType(base, type, replaceIfExists);
    }
    // Helpers
    getObjectType(obj) {
        return this.classMetadataStore.withDefault(obj, 'type', undefined);
    }
    setObjectType(obj, type, replaceIfExists) {
        if (replaceIfExists || !obj['type']) {
            obj['type'] = type;
        }
    }
}
