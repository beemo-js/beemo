import {ConverterData, ConverterType} from './types'

export class Converter {
    /**
     * Maps converter ids to converters.
     */
    private converters: {[converterId: string]: ConverterType} = {}

    /**
     * Registers a converter. The converter will then know how to convert a value using given converterId.
     */
    registerConverter(converterId: string, converter: ConverterType): void {
        this.converters[converterId] = converter
    }

    /**
     * Convert a value using given converters.
     */
    convert(value: any, convertersData: ConverterData[]): any {
        convertersData.forEach(converterData => {
            value = this.converters[converterData.id](value, converterData.args)
        })

        return value
    }
}
