"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normalizer = /** @class */ (function () {
    function Normalizer(classMetadataStore) {
        this.classMetadataStore = classMetadataStore;
    }
    // Class instance to object
    Normalizer.prototype.normalize = function (classFn, instance, group) {
        var _this = this;
        if (group === void 0) { group = Normalizer.defaultGroup; }
        // if input is an array, return an array of converted inputs
        if (Array.isArray(instance)) {
            return instance.map(function (i) { return _this.normalize(classFn, i, group); });
        }
        // if classFN is Object, return as is
        if (classFn === Object) {
            return instance;
        }
        var mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'];
        var result = {};
        for (var prop in instance) {
            // only map mapped fields
            if (!(prop in mappedFields &&
                (group in mappedFields[prop] || Normalizer.defaultGroup in mappedFields[prop])))
                continue;
            // merge field config for given group with default group
            var fieldConfig = Object.assign({}, mappedFields[prop][group] || {}, mappedFields[prop][Normalizer.defaultGroup] || {});
            // console.log('LOG', prop, fieldConfig, mappedFields[prop][group], mappedFields[prop][Normalizer.defaultGroup])
            if (fieldConfig.include === false)
                continue;
            // call the normalizer on the property value if needed
            var value = instance[prop];
            if (!!fieldConfig.mappedClass) {
                value = this.normalize(fieldConfig.mappedClass, value, group);
            }
            result[fieldConfig.name] = value;
        }
        return result;
    };
    Normalizer.prototype.normalizeInstance = function (instance, group) {
        if (group === void 0) { group = Normalizer.defaultGroup; }
        return this.normalize(instance.constructor, instance, group);
    };
    // Object to class instance
    Normalizer.prototype.denormalize = function (classFn, data, group) {
        var _this = this;
        if (group === void 0) { group = Normalizer.defaultGroup; }
        // if input is an array, return an array of converted inputs
        if (Array.isArray(data)) {
            return data.map(function (i) { return _this.denormalize(classFn, i, group); });
        }
        // if classFN is Object, return as is
        if (classFn === Object) {
            return data;
        }
        // create instance of output
        var newInstance = Object.create(classFn.prototype);
        newInstance.constructor.apply(newInstance, []);
        var mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'];
        var inversedMappedFieldsData = this.classMetadataStore.getClassData(classFn)['inversed-mapped-fields'];
        var inversedMappedFields = Object.assign({}, inversedMappedFieldsData[group], inversedMappedFieldsData[Normalizer.defaultGroup]);
        var prop;
        for (var field in data) {
            if (!(field in inversedMappedFields))
                continue;
            prop = inversedMappedFields[field];
            // merge field config for given group with default group
            var fieldConfig = Object.assign({}, mappedFields[prop][group] || {}, mappedFields[prop][Normalizer.defaultGroup] || {});
            if (fieldConfig.include === false)
                continue;
            // denormalize data if needed
            if (typeof data[field] === 'object' && !!fieldConfig.mappedClass) {
                data[field] = this.denormalize(fieldConfig.mappedClass, data[field], group);
            }
            newInstance[prop] = data[field];
        }
        return newInstance;
    };
    Normalizer.defaultGroup = 'all';
    return Normalizer;
}());
exports.Normalizer = Normalizer;
