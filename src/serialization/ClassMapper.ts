import {Normalizer} from './Normalizer'

export class ClassMapper {
    constructor(
        private normalizer: Normalizer
    ) {}

    map<From, To>(value: From, fromClass: Function, toClass: Function, group: string = Normalizer.defaultGroup): To {
        const normalized = this.normalizer.normalize(fromClass, value, group)
        const denormalized = this.normalizer.denormalize(toClass, normalized, group)
        return denormalized as To
    }
}
