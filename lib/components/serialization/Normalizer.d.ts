import { ClassMetadataStore } from '../metadata/ClassMetadataStore';
export declare class Normalizer {
    private classMetadataStore;
    static defaultGroup: string;
    constructor(classMetadataStore: ClassMetadataStore);
    normalize<T>(classFn: Function, instance: T[] | T, group?: string): Object | Object[];
    normalizeInstance<T>(instance: T[] | T, group?: string): Object | Object[];
    denormalize<T>(classFn: Function, data: Object | Object[], group?: string): T | T[];
}
