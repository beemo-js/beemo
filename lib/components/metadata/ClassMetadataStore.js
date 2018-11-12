// {
//   'TestClass': {
//     'class': {
//       'annotations': []
//     },
//     'constructor': {
//       'parameters': {
//         [index]: {
//           'type': '',
//           'annotations': []
//         }
//       }
//     },
//     'properties': {
//       [property]: {
//         'type': '',
//         'annotations': []
//       }
//     },
//     'methods': {
//       'type': '',
//       'annotations': [],
//       'parameters': {
//         [index]: {
//           'type': '',
//           'annotations': []
//         }
//       }
//     }
//   }
// }
/**
 * Store of metadata for classes.
 */
export class ClassMetadataStore {
    constructor() {
        this.metadata = new Map();
    }
    // Class
    getClassData(classFn) {
        return this.withDefault(this.classData(classFn), 'class', {});
    }
    // Constructor
    getConstructorData(classFn) {
        return this.withDefault(this.classData(classFn), 'constructor', {});
    }
    getConstructorParametersData(classFn) {
        return this.withDefault(this.getConstructorData(classFn), 'parameters', {});
    }
    getConstructorParameterData(classFn, index) {
        return this.withDefault(this.getConstructorParametersData(classFn), index, {});
    }
    // Properties
    getPropertiesData(classFn) {
        return this.withDefault(this.classData(classFn), 'properties', {});
    }
    getPropertyData(classFn, propertyName) {
        return this.withDefault(this.getPropertiesData(classFn), propertyName, {});
    }
    // Methods
    getMethodsData(classFn) {
        return this.withDefault(this.classData(classFn), 'methods', {});
    }
    getMethodData(classFn, methodName) {
        return this.withDefault(this.getMethodsData(classFn), methodName, {});
    }
    getMethodParametersData(classFn, methodName) {
        return this.withDefault(this.getMethodData(classFn, methodName), 'parameters', {});
    }
    getMethodParameterData(classFn, methodName, index) {
        return this.withDefault(this.getMethodParametersData(classFn, methodName), index, {});
    }
    withDefault(obj, key, defaultValue) {
        if (!obj[key])
            obj[key] = defaultValue;
        return obj[key];
    }
    classData(classFn) {
        const data = this.metadata.get(classFn);
        if (data === undefined) {
            const result = {};
            this.metadata.set(classFn, result);
            return result;
        }
        return data;
    }
}
