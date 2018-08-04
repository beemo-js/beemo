import { ConverterData, ConverterType } from './types';
export declare class Converter {
    /**
     * Maps converter ids to converters.
     */
    private converters;
    /**
     * Registers a converter. The converter will then know how to convert a value using given converterId.
     */
    registerConverter(converterId: string, converter: ConverterType): void;
    /**
     * Convert a value using given converters.
     */
    convert(value: any, convertersData: ConverterData[]): any;
}
