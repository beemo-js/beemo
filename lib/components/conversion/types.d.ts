export declare type ConverterType = (value: any, ...args) => any;
/**
 * Represents a converter to apply to a value.
 */
export interface ConverterData {
    id: string;
    args: Object;
}
