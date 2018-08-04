"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Store of metadata for classes.
 */
var ClassMetadataStore = /** @class */ (function () {
    function ClassMetadataStore() {
        this.metadata = new Map();
    }
    // Class
    ClassMetadataStore.prototype.getClassData = function (classFn) {
        return this.withDefault(this.classData(classFn), 'class', {});
    };
    // Constructor
    ClassMetadataStore.prototype.getConstructorData = function (classFn) {
        return this.withDefault(this.classData(classFn), 'constructor', {});
    };
    ClassMetadataStore.prototype.getConstructorParametersData = function (classFn) {
        return this.withDefault(this.getConstructorData(classFn), 'parameters', {});
    };
    ClassMetadataStore.prototype.getConstructorParameterData = function (classFn, index) {
        return this.withDefault(this.getConstructorParametersData(classFn), index, {});
    };
    // Properties
    ClassMetadataStore.prototype.getPropertiesData = function (classFn) {
        return this.withDefault(this.classData(classFn), 'properties', {});
    };
    ClassMetadataStore.prototype.getPropertyData = function (classFn, propertyName) {
        return this.withDefault(this.getPropertiesData(classFn), propertyName, {});
    };
    // Methods
    ClassMetadataStore.prototype.getMethodsData = function (classFn) {
        return this.withDefault(this.classData(classFn), 'methods', {});
    };
    ClassMetadataStore.prototype.getMethodData = function (classFn, methodName) {
        return this.withDefault(this.getMethodsData(classFn), methodName, {});
    };
    ClassMetadataStore.prototype.getMethodParametersData = function (classFn, methodName) {
        return this.withDefault(this.getMethodData(classFn, methodName), 'parameters', {});
    };
    ClassMetadataStore.prototype.getMethodParameterData = function (classFn, methodName, index) {
        return this.withDefault(this.getMethodParametersData(classFn, methodName), index, {});
    };
    ClassMetadataStore.prototype.withDefault = function (obj, key, defaultValue) {
        if (!obj[key])
            obj[key] = defaultValue;
        return obj[key];
    };
    ClassMetadataStore.prototype.classData = function (classFn) {
        var data = this.metadata.get(classFn);
        if (data === undefined) {
            var result = {};
            this.metadata.set(classFn, result);
            return result;
        }
        return data;
    };
    return ClassMetadataStore;
}());
exports.ClassMetadataStore = ClassMetadataStore;
