import { Normalizer } from '../Normalizer';
import { Serializer } from './Serializer';
import { Encoder } from '../encoders/Encoder';
export declare class ComposableSerializer implements Serializer {
    private normalizer;
    private encoder;
    constructor(normalizer: Normalizer, encoder: Encoder);
    deserialize<T>(classFn: Function, text: string, group?: string): T | T[];
    serialize<T>(classFn: Function, data: T | T[], group?: string): string;
}
