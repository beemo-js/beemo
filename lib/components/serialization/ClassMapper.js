import { Normalizer } from './Normalizer';
export class ClassMapper {
    constructor(normalizer) {
        this.normalizer = normalizer;
    }
    map(value, fromClass, toClass, group = Normalizer.defaultGroup) {
        const normalized = this.normalizer.normalize(fromClass, value, group);
        const denormalized = this.normalizer.denormalize(toClass, normalized, group);
        return denormalized;
    }
}
