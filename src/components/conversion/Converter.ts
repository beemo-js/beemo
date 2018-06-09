import {ConverterData, ConverterType} from './types'

export class Converter {
    private converters = {}

    registerConverter(converterId: string, converter: ConverterType): void {
        this.converters[converterId] = converter
    }

    convert(value: any, convertersData: ConverterData[]): any {
        convertersData.forEach(converterData => {
            value = this.converters[converterData.id](value, converterData.args)
        })

        return value
    }
}
