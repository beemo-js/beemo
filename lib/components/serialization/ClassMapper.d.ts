import { Normalizer } from './Normalizer';
export declare class ClassMapper {
    private normalizer;
    constructor(normalizer: Normalizer);
    map<From, To>(value: From, fromClass: Function, toClass: Function, group?: string): To;
}
