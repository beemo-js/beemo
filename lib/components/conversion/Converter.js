"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter = /** @class */ (function () {
    function Converter() {
        /**
         * Maps converter ids to converters.
         */
        this.converters = {};
    }
    /**
     * Registers a converter. The converter will then know how to convert a value using given converterId.
     */
    Converter.prototype.registerConverter = function (converterId, converter) {
        this.converters[converterId] = converter;
    };
    /**
     * Convert a value using given converters.
     */
    Converter.prototype.convert = function (value, convertersData) {
        var _this = this;
        convertersData.forEach(function (converterData) {
            value = _this.converters[converterData.id](value, converterData.args);
        });
        return value;
    };
    return Converter;
}());
exports.Converter = Converter;
