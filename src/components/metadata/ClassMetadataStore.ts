
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

    private metadata = new Map<Function, Object>()

    // Class

    getClassData(classFn: Function): Object {
        return this.withDefault(this.classData(classFn), 'class', {})
    }

    // Constructor

    getConstructorData(classFn: Function): Object[] {
        return this.withDefault(this.classData(classFn), 'constructor', {})
    }

    getConstructorParametersData(classFn: Function): Object[] {
        return this.withDefault(this.getConstructorData(classFn), 'parameters', {})
    }

    getConstructorParameterData(classFn: Function, index: number): Object {
        return this.withDefault(this.getConstructorParametersData(classFn), index, {})
    }

    // Properties

    getPropertiesData(classFn: Function): Object {
        return this.withDefault(this.classData(classFn), 'properties', {})
    }

    getPropertyData(classFn: Function, propertyName: string): Object {
        return this.withDefault(this.getPropertiesData(classFn), propertyName, {})
    }

    // Methods

    getMethodsData(classFn: Function): Object {
        return this.withDefault(this.classData(classFn), 'methods', {})
    }

    getMethodData(classFn: Function, methodName: string): Object {
        return this.withDefault(this.getMethodsData(classFn), methodName, {})
    }

    getMethodParametersData(classFn: Function, methodName: string): Object[] {
        return this.withDefault(this.getMethodData(classFn, methodName), 'parameters', {})
    }

    getMethodParameterData(classFn: Function, methodName: string, index: number): Object {
        return this.withDefault(this.getMethodParametersData(classFn, methodName), index, {})
    }

    withDefault(obj: Object, key: string|number, defaultValue: any): any {
        if (!obj[key]) obj[key] = defaultValue
        return obj[key]
    }

    private classData(classFn: Function): Object {
        const data = this.metadata.get(classFn)
        if (data === undefined) {
            const result = {}
            this.metadata.set(classFn, result)
            return result
        }

        return data
    }
}
