export class Converter {
    constructor() {
        /**
         * Maps converter ids to converters.
         */
        this.converters = {};
    }
    /**
     * Registers a converter. The converter will then know how to convert a value using given converterId.
     */
    registerConverter(converterId, converter) {
        this.converters[converterId] = converter;
    }
    /**
     * Convert a value using given converters.
     */
    convert(value, convertersData) {
        convertersData.forEach(converterData => {
            value = this.converters[converterData.id](value, converterData.args);
        });
        return value;
    }
}
