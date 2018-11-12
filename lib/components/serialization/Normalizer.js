export class Normalizer {
    constructor(classMetadataStore) {
        this.classMetadataStore = classMetadataStore;
    }
    // Class instance to object
    normalize(classFn, instance, group = Normalizer.defaultGroup) {
        // if input is an array, return an array of converted inputs
        if (Array.isArray(instance)) {
            return instance.map(i => this.normalize(classFn, i, group));
        }
        // if classFN is Object, return as is
        if (classFn === Object) {
            return instance;
        }
        const mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'];
        const result = {};
        for (let prop in instance) {
            // only map mapped fields
            if (!(prop in mappedFields &&
                (group in mappedFields[prop] || Normalizer.defaultGroup in mappedFields[prop])))
                continue;
            // merge field config for given group with default group
            let fieldConfig = Object.assign({}, mappedFields[prop][group] || {}, mappedFields[prop][Normalizer.defaultGroup] || {});
            // console.log('LOG', prop, fieldConfig, mappedFields[prop][group], mappedFields[prop][Normalizer.defaultGroup])
            if (fieldConfig.include === false)
                continue;
            // call the normalizer on the property value if needed
            let value = instance[prop];
            if (!!fieldConfig.mappedClass) {
                value = this.normalize(fieldConfig.mappedClass, value, group);
            }
            result[fieldConfig.name] = value;
        }
        return result;
    }
    normalizeInstance(instance, group = Normalizer.defaultGroup) {
        return this.normalize(instance.constructor, instance, group);
    }
    // Object to class instance
    denormalize(classFn, data, group = Normalizer.defaultGroup) {
        // if input is an array, return an array of converted inputs
        if (Array.isArray(data)) {
            return data.map(i => this.denormalize(classFn, i, group));
        }
        // if classFN is Object, return as is
        if (classFn === Object) {
            return data;
        }
        // create instance of output
        const newInstance = Object.create(classFn.prototype);
        newInstance.constructor.apply(newInstance, []);
        const mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'];
        const inversedMappedFieldsData = this.classMetadataStore.getClassData(classFn)['inversed-mapped-fields'];
        const inversedMappedFields = Object.assign({}, inversedMappedFieldsData[group], inversedMappedFieldsData[Normalizer.defaultGroup]);
        let prop;
        for (let field in data) {
            if (!(field in inversedMappedFields))
                continue;
            prop = inversedMappedFields[field];
            // merge field config for given group with default group
            let fieldConfig = Object.assign({}, mappedFields[prop][group] || {}, mappedFields[prop][Normalizer.defaultGroup] || {});
            if (fieldConfig.include === false)
                continue;
            // denormalize data if needed
            if (typeof data[field] === 'object' && !!fieldConfig.mappedClass) {
                data[field] = this.denormalize(fieldConfig.mappedClass, data[field], group);
            }
            newInstance[prop] = data[field];
        }
        return newInstance;
    }
}
Normalizer.defaultGroup = 'all';
