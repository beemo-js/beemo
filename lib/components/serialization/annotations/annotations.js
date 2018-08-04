"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../../framework");
var Normalizer_1 = require("../Normalizer");
function fillInversedFieldsByGroup(inversedMappedFields, propertyKey, config) {
    for (var group in config) {
        if (!inversedMappedFields[group]) {
            inversedMappedFields[group] = {};
        }
        inversedMappedFields[group][config[group].name] = propertyKey;
    }
}
/**
 * Register property as a normalizable one.
 */
function MappedField(config) {
    return function (target, propertyKey) {
        var classMetadataStore = framework_1.container.get(framework_1.MetadataServiceName.ClassMetadataStore);
        var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
        config = config || propertyKey;
        if (typeof config === 'string') {
            config = (_a = {},
                _a[Normalizer_1.Normalizer.defaultGroup] = {
                    name: config
                },
                _a);
        }
        if (!config[Normalizer_1.Normalizer.defaultGroup] || !config[Normalizer_1.Normalizer.defaultGroup].name) {
            for (var group in config) {
                config[group].name = propertyKey;
            }
        }
        classAnnotationsStore.addPropertyAnnotation(target.constructor, propertyKey, MappedField, { config: config });
        var mappedFields = classMetadataStore.withDefault(classMetadataStore.getClassData(target.constructor), 'mapped-fields', {});
        mappedFields[propertyKey] = config;
        var inversedMappedFields = classMetadataStore.withDefault(classMetadataStore.getClassData(target.constructor), 'inversed-mapped-fields', {});
        fillInversedFieldsByGroup(inversedMappedFields, propertyKey, config);
        var _a;
    };
}
exports.MappedField = MappedField;
