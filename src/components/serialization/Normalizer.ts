import {ClassMetadataStore} from '../metadata/ClassMetadataStore'
import {MappedFieldConfiguration} from './types'

export class Normalizer {

    static defaultGroup: string = 'all'

    constructor(
        private classMetadataStore: ClassMetadataStore
    ) {}

    // Class instance to object
    normalize<T>(
        classFn: Function,
        instance: T[] | T,
        group: string = Normalizer.defaultGroup
    ): Object | Object[] {
        // if input is an array, return an array of converted inputs
        if (Array.isArray(instance)) {
            return instance.map(i => this.normalize<T>(classFn, i, group))
        }

        if (classFn === Object) {
            return instance as Object
        }

        const mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'] as { [field: string]: MappedFieldConfiguration }

        const result = {}
        for (let prop in instance) {
            // only map mapped fields
            if (!(
                prop in mappedFields &&
                (group in mappedFields[prop] || Normalizer.defaultGroup in mappedFields[prop])
            )) continue

            // merge field config for given group with default group
            let fieldConfig = Object.assign(
                {},
                mappedFields[prop][group] || {},
                mappedFields[prop][Normalizer.defaultGroup] || {}
            ) as MappedFieldConfiguration[string]
            // console.log('LOG', prop, fieldConfig, mappedFields[prop][group], mappedFields[prop][Normalizer.defaultGroup])

            if (fieldConfig.include === false) continue

            // call the normalizer on the property value if needed
            let value: any = instance[prop]
            if (!!fieldConfig.mappedClass) {
                value = this.normalize(fieldConfig.mappedClass, value, group)
            }

            result[fieldConfig.name] = value
        }
        return result
    }

    normalizeInstance<T>(
        instance: T[] | T,
        group: string = Normalizer.defaultGroup
    ): Object | Object[] {
        return this.normalize(instance.constructor, instance, group)
    }

    // Object to class instance
    denormalize<T>(
        classFn: Function,
        data: Object | Object[],
        group: string = Normalizer.defaultGroup
    ): T | T[] {
        // if input is an array, return an array of converted inputs
        if (Array.isArray(data)) {
            return data.map(i => this.denormalize<T>(classFn, i, group) as T)
        }

        if (classFn === Object) {
            return data as T
        }

        // create instance of output
        const newInstance = Object.create(classFn.prototype)
        newInstance.constructor.apply(newInstance, [])

        const mappedFields = this.classMetadataStore.getClassData(classFn)['mapped-fields'] as { [field: string]: MappedFieldConfiguration }
        const inversedMappedFieldsData: { [group: string]: { [mappedField: string]: string } } = this.classMetadataStore.getClassData(classFn)['inversed-mapped-fields']
        const inversedMappedFields = Object.assign({}, inversedMappedFieldsData[group], inversedMappedFieldsData[Normalizer.defaultGroup])

        let prop: string
        for (let field in data) {
            if (!(field in inversedMappedFields)) continue

            prop = inversedMappedFields[field]

            // merge field config for given group with default group
            let fieldConfig = Object.assign(
                {},
                mappedFields[prop][group] || {},
                mappedFields[prop][Normalizer.defaultGroup] || {}
            ) as MappedFieldConfiguration[string]

            if (fieldConfig.include === false) continue

            // denormalize data if needed
            if (typeof data[field] === 'object' && !!fieldConfig.mappedClass) {
                data[field] = this.denormalize(fieldConfig.mappedClass, data[field], group)
            }

            newInstance[prop] = data[field]
        }

        return newInstance as T
    }
}
