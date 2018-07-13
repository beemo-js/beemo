import {Normalizer} from '../Normalizer'
import {Encoder} from '..'
import {Serializer} from './Serializer'

export class ComposableSerializer implements Serializer {
    constructor(
        private normalizer: Normalizer,
        private encoder: Encoder
    ) {}

    deserialize<T>(classFn: Function, text: string, group: string = Normalizer.defaultGroup): T|T[] {
        return this.normalizer.denormalize(classFn, this.encoder.decode(text), group);
    }

    serialize<T>(classFn: Function, data: T|T[], group: string = Normalizer.defaultGroup): string {
        return this.encoder.encode(this.normalizer.normalize(classFn, data, group))
    }
}