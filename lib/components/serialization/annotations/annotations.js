import { Normalizer } from '../Normalizer';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, MetadataServiceName } from '../../../framework/services';
function fillInversedFieldsByGroup(inversedMappedFields, propertyKey, config) {
    for (let group in config) {
        if (!inversedMappedFields[group]) {
            inversedMappedFields[group] = {};
        }
        inversedMappedFields[group][config[group].name] = propertyKey;
    }
}
/**
 * Register property as a normalizable one.
 */
export function MappedField(config) {
    return (target, propertyKey) => {
        const classMetadataStore = container.get(MetadataServiceName.ClassMetadataStore);
        const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
        config = config || propertyKey;
        if (typeof config === 'string') {
            config = {
                [Normalizer.defaultGroup]: {
                    name: config
                }
            };
        }
        if (!config[Normalizer.defaultGroup] || !config[Normalizer.defaultGroup].name) {
            for (let group in config) {
                config[group].name = propertyKey;
            }
        }
        classAnnotationsStore.addPropertyAnnotation(target.constructor, propertyKey, MappedField, { config });
        const mappedFields = classMetadataStore.withDefault(classMetadataStore.getClassData(target.constructor), 'mapped-fields', {});
        mappedFields[propertyKey] = config;
        const inversedMappedFields = classMetadataStore.withDefault(classMetadataStore.getClassData(target.constructor), 'inversed-mapped-fields', {});
        fillInversedFieldsByGroup(inversedMappedFields, propertyKey, config);
    };
}
