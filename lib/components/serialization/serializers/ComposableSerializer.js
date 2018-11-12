import { Normalizer } from '../Normalizer';
export class ComposableSerializer {
    constructor(normalizer, encoder) {
        this.normalizer = normalizer;
        this.encoder = encoder;
    }
    deserialize(classFn, text, group = Normalizer.defaultGroup) {
        return this.normalizer.denormalize(classFn, this.encoder.decode(text), group);
    }
    serialize(classFn, data, group = Normalizer.defaultGroup) {
        return this.encoder.encode(this.normalizer.normalize(classFn, data, group));
    }
}
